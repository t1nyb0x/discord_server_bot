import discord
from discord.ext import commands, tasks
from googletrans import Translator
import random
import dokafunc
from settings import apitoken

class JapaneseHelpCommand(commands.DefaultHelpCommand):
    def __init__(self):
        super().__init__()
        self.commands_heading = 'コマンド:'
        self.no_category = 'その他'
        self.command_attrs['help'] = ""

    def get_ending_note(self):
        return (f"channels: このサーバーに存在するチャンネルを紹介するぜ\n"
                f"\n"
                f"channels en: 英語でこのサーバーに存在するチャンネルを紹介するぜ\n"
                f"\n"
                f"paisenGacha: パイセンが作ったパイセンガチャだぜ\n"
                f"\n"
                f"trans: 岡山の県北で培った語学力で翻訳するぜ。 /dokachan trans <翻訳先言語> <翻訳したい内容> で実行するんや\n"
                f"\n"
                f"translist: 岡山で学んだ翻訳可能言語を紹介するぜ。\n"
                f"\n"
                f"help: 今開いている内容を出すぜ\n")


TOKEN = apitoken.TOKEN
prefix = '/dokachan '
admin_id = [apitoken.HAL, apitoken.YUMA, apitoken.BIKKY]

class Dokachan(commands.Cog):
    def __init__(self, bot):
        super().__init__()
        self.bot = bot

    def translate(self, lang, source):
        """
        translate

        Arguments:
            lang   {string} -- 翻訳先言語
            source {string} -- きたねぇ日本語を入れるぜ
        """
        trans_res = ''
        translator = Translator()
        trans_res = translator.translate(source, dest=lang).text

        return trans_res

    def translateList(self):
        res = ''
        res = """
        ```このサーバーでよく見かける言語に変換する場合はこれを使ってね。
            英語  en
            韓国語 ko
            スペイン語 es
            日本語 ja
            他の言語はこちらを参照してください https://cloud.google.com/translate/docs/languages?hl=ja```
            """

        return res

    def forecast(self, location):
        weather = dokafunc.weather.Weather(apitoken.WEATHER_TOKEN)
        res = weather.search(location)
        return res

    @commands.command()
    async def trans(self, ctx, arg1, arg2):
        res = self.translate(arg1, arg2)
        await ctx.send(res)

    @commands.command()
    async def translist(self, ctx):
        res = self.translateList()
        await ctx.send(res)

    @commands.command()
    async def channels(self, ctx, arg=None):
        if arg == None:
            arg = 'ja'

        res = dokafunc.channels.channelList(arg)
        await ctx.send(res)

    @commands.command()
    async def dokachanDiary1(self, ctx):
        res = dokafunc.diary.diary1()
        await ctx.send(res)

    @commands.command()
    async def dokachanDiary2(self, ctx):
        res = dokafunc.diary.diary2()
        await ctx.send(res)

    @commands.command()
    async def paisenGacha(self, ctx):
        val = random.randrange(10)
        if val % 3 == 0:
            await ctx.send('<:pi:705850200090083399>')
        elif val % 3 == 1:
            await ctx.send('<:paisen:705854168425824366>')
        elif val % 3 == 2:
            await ctx.send('<:paisenPi:705854745666912297>')

    @commands.command()
    async def omikuzi(self, ctx):
        res = dokafunc.gacha.dokamikuzi()
        await ctx.send(res)

    @commands.command()
    async def weather(self, ctx, location):
        res = self.forecast(location)
        await ctx.send(res)

    @commands.command()
    async def supervise_spaces(self, ctx):
        """
        スペース取得処理を開始する
        """
        user_id = ctx.message.author.id
        if str(user_id) in admin_id:
            await ctx.send('スペース取得定期実行を開始します\n')
            self.start_schedule.start(ctx)
        else:
            await ctx.send('管理者以外からの実行はできません')

    @commands.command()
    async def stop_supervise_spaces(self, ctx):
        """
        スペース取得処理を止める
        """
        user_id = ctx.message.author.id
        if str(user_id) in admin_id:
            self.start_schedule.cancel()
            await ctx.send('スペース取得定期実行を停止します\n')
        else:
            await ctx.send('管理者以外からの実行はできません')

    client = discord.Client()
    @client.event
    async def on_ready(self, ctx):
        """
        起動時実行
        スペース取得処理を開始する
        """
        self.start_schedule(ctx)


    @tasks.loop(minutes=5)
    async def start_schedule(self, ctx):
        """
        スケジュール開始
        """
        await self.subscribe_spaces(ctx)

    async def subscribe_spaces(self, ctx):
        """
        subscribe_spaces
        スペース情報を購読する。
        yuma_mhsのスペース情報を取得し、Discordで送信する。
        """
        space_searcher = dokafunc.get_space_data.GetSpaceData(bearer=apitoken.TWITTER_BEARER)
        space_info = space_searcher.search(apitoken.YUMA_MHS_TWITTER_ID)


        # スペースが見つからない場合は、メッセージを返却する
        # if type(space_info) is str:
        #     await ctx.send(space_info)
        if type(space_info) is dict:
            speaker_user = []
            for speaker in space_info['speaker_info']:
                speaker_user.append(speaker['name'] + '  https://twitter.com/' + speaker['username'])

            content_text = "スペースが現在開催中です。\n\nタイトル： " + space_info['title'] + "\n" +  'https://twitter.com/i/spaces/' + space_info['space_id'] + "\n" + \
                "開始時間： " + space_info['created_at'] + "\n" \
                "現在" + str(len(speaker_user) + space_info['participant_count']) + "人が参加中です\n" \
                "```スピーカー\n" + \
                "\n".join(speaker_user) + \
                "```"

            await ctx.send(content_text)

bot = commands.Bot(command_prefix=prefix,
                help_command=JapaneseHelpCommand())
bot.add_cog(Dokachan(bot=bot))
bot.run(TOKEN)
