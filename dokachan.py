import discord
from discord.ext import commands
from googletrans import Translator
import random
import dokafunc



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


TOKEN = 'NzAzOTY1MzU2NTQ4Njg1ODg0.XqWY1Q.YmeP-sNuJh5PGBitDXyOfTHMiPg'
prefix = '/dokachan '


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


bot = commands.Bot(command_prefix=prefix,
                   help_command=JapaneseHelpCommand())
bot.add_cog(Dokachan(bot=bot))
bot.run(TOKEN)
