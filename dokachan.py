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
                f"\n"
                f"channels en: 英語でこのサーバーに存在するチャンネルを紹介するぜ\n"
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

    def channelList(self, arg="ja"):
        res = ''
        if arg == "en":
            res = """```Channel Explanation
            welcome          - Landing channel
            チャンネル説明     - Channel information.
            告知             - Announcements will be posted in this channel.
            自己紹介はこちらへ - Please introduce yourself when you enter the server.
            雑談             - The main chit-chat channel.
            プログラム        - Bot-developing channel, such as yattaze, dokachan
            お問い合わせ窓口   - Support channel for if you have any inquiries.
            麻雀             - Mahjong channel. Mainly playing mahjongsoul.
            もし日本語で見たい場合は、「/dokachan channels」を実行してください」
            ```
            """
        elif arg == "ja":
            res = """
            ```チャンネル説明
                welcome          - ランディングチャンネル
                チャンネル説明     - このサーバーに関する説明が掲載されています
                告知             - このサーバーに関する告知や、個人に関する告知が掲載されます
                自己紹介はこちらへ  - サーバーに入ったらまずは自己紹介！
                雑談             - 多分ここがメインチャンネル。好きなようにお喋りしましょう。喧嘩はご法度です
                プログラム        - Dokachanやyattazeを作った人がここで何かしらやってます。Botへの追加機能要望を出すのもありかも？
                お問い合わせ窓口   - サーバーに関して気になることがあればこちらへ
                麻雀             - 麻雀打ちたい人はこちらへ。大抵雀魂で打ってます
                If you read it in English, please type "/dokachan channels en"
            ```
                """

        return res

    def diary1(self):
        res = ''
        res = """```
                やったぜ。　投稿者：変態糞土方 (8月16日（水）07時14分22秒)

                昨日の8月15日にいつもの浮浪者のおっさん（60歳）と先日メールくれた汚れ好きの土方のにいちゃん
                （45歳）とわし（53歳）の3人で県北にある川の土手の下で盛りあったぜ。
                今日は明日が休みなんでコンビニで酒とつまみを買ってから滅多に人が来ない所なんで、
                そこでしこたま酒を飲んでからやりはじめたんや。
                3人でちんぽ舐めあいながら地下足袋だけになり持って来たいちぢく浣腸を3本ずつ入れあった。
                しばらくしたら、けつの穴がひくひくして来るし、糞が出口を求めて腹の中でぐるぐるしている。
                浮浪者のおっさんにけつの穴をなめさせながら、兄ちゃんのけつの穴を舐めてたら、
                先に兄ちゃんがわしの口に糞をドバーっと出して来た。
                それと同時におっさんもわしも糞を出したんや。もう顔中、糞まみれや、
                3人で出した糞を手で掬いながらお互いの体にぬりあったり、
                糞まみれのちんぽを舐めあって小便で浣腸したりした。ああ～～たまらねえぜ。
                しばらくやりまくってから又浣腸をしあうともう気が狂う程気持ちええんじゃ。
                浮浪者のおっさんのけつの穴にわしのちんぽを突うずるっ込んでやると
                けつの穴が糞と小便でずるずるして気持ちが良い。
                にいちゃんもおっさんの口にちんぽ突っ込んで腰をつかって居る。
                糞まみれのおっさんのちんぽを掻きながら、思い切り射精したんや。
                それからは、もうめちゃくちゃにおっさんと兄ちゃんの糞ちんぽを舐めあい、
                糞を塗りあい、二回も男汁を出した。もう一度やりたいぜ。
                やはり大勢で糞まみれになると最高やで。こんな、変態親父と糞あそびしないか。
                ああ～～早く糞まみれになろうぜ。
                岡山の県北であえる奴なら最高や。わしは163*90*53,おっさんは165*75*60、や
                糞まみれでやりたいやつ、至急、メールくれや。
                土方姿のまま浣腸して、糞だらけでやろうや。```
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

        res = self.channelList(arg)
        await ctx.send(res)

    @commands.command()
    async def dokachanDiary1(self, ctx):
        res = self.diary1()
        await ctx.send(res)

    @commands.command()
    async def paisen(self, ctx):
        await ctx.send('<:paisenPi:705854745666912297>')


bot = commands.Bot(command_prefix=prefix,
                   help_command=JapaneseHelpCommand())
bot.add_cog(Dokachan(bot=bot))
bot.run(TOKEN)
