import discord
from discord.ext import commands
from googletrans import Translator

class JapaneseHelpCommand(commands.DefaultHelpCommand):
    def __init__(self):
        super().__init__()
        self.commands_heading = 'コマンド:'
        self.no_category = 'その他'
        self.command_attrs['help'] = ""

    def get_ending_note(self):
        return (f"channels: このサーバーに存在するチャンネルを紹介するぜ\n"
                f"trans: 岡山の県北で培った語学力で翻訳するぜ。 /dokachan trans <翻訳先言語> <翻訳したい内容> で実行するんや\n"
                f"翻訳可能言語は、 /dokachan translist で確認してくれ。\n"
                f"help: 今開いている内容を出すぜ\n")


TOKEN = 'NzAzOTY1MzU2NTQ4Njg1ODg0.XqWY1Q.YmeP-sNuJh5PGBitDXyOfTHMiPg'
prefix = '/dokachan '


class Dokachan(commands.Cog):
    def __init__(self, bot):
        super().__init__()
        self.bot = bot

    def translate(self, lang, source):
        """translate

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
        res = """このサーバーでよく見かける言語に変換する場合はこれを使ってね。
                英語  en
                韓国語 ko
                スペイン語 es
                日本語 ja
                他の言語はこちらを参照してください https://cloud.google.com/translate/docs/languages?hl=ja"""

        return res

    def channelList(self):
        res = ''
        res = """welcome - ランディングチャンネル
                チャンネル説明 - このサーバーに関する説明が掲載されています
                告知 - このサーバーに関する告知や、個人に関する告知が掲載されます
                自己紹介はこちらへ - サーバーに入ったらまずは自己紹介！
                雑談 - 多分ここがメインチャンネル。好きなようにお喋りしましょう。喧嘩はご法度です
                プログラム - Dokachanやyattazeを作った人がここで何かしらやってます。Botへの追加機能要望を出すのもありかも？
                お問い合わせ窓口 - サーバーに関して気になることがあればこちらへ
                麻雀 - 麻雀打ちたい人はこちらへ。大抵雀魂で打ってます"""

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
    async def channels(self, ctx):
        res = self.channelList()
        await ctx.send(res)

bot = commands.Bot(command_prefix=prefix,
                   help_command=JapaneseHelpCommand())
bot.add_cog(Dokachan(bot=bot))
bot.run(TOKEN)



