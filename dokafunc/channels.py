def channelList(self, arg="ja"):
    res = ''
    if arg == "en":
        res = """```Channel Explanation
        Welcome         - Landing channel
        チャンネル説明    - Information about the channel can be found here.
        告知            - Server and personal announcements will be posted in this channel.
        自己紹介はこちらへ - Please introduce yourself when you enter the server.
        雑談            - The main chit-chat channel. Let's chat about anything, let's all get along.
        プログラム       - The people who worked on Dokachan and yattaze do their magic here, maybe you can send a request to add additional features to the bots?
        お問い合わせ窓口  - If you have any inquiries about the server, please let us know here.
        麻雀            - Mahjong channel. We mainly play 雀魂 (MahjongSoul).
        音ゲー用         - We talk about various rhythm games and share our results.
        汚い雑談         -  This is the dirty chit-chat channel (there's a lot of dirty jokes, so a role request is required).
        イベント用       - A channel dedicated to server events.
        もし日本語で見たい場合は、「/dokachan channels」を実行してください
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
            音ゲー用         - 音ゲーに関する話題や、リザルトをシェアする場所です
            汚い雑談         - ああもう無茶苦茶や。糞まみれになりたいやつ、ここのチャンネルで雑談しようや（下ネタが多いので、ロール申請が必要です）
            イベント用        - イベント系においての雑談場です。
            If you want to read it in English, please type  "/dokachan channels en"
        ```
            """

    return res