# discord_server_bot

## 概要

身内コミュニティで利用しているDiscordBotです

Discord.py開発終了に伴い、現在Discord.jsで動作するよう改修中です。

## 機能

改修後に使える機能は以下の通りです

- 天気予報

OpenWeather (https://openweathermap.org/) を利用した、天気予報情報取得機能。

`>> weather tokyo` と送ることで以下の情報が返ってきます。

```text
今日の東京都の天気情報
現在の天気: Clouds 薄い雲
現在の気温: 18.23℃
現在の体感温度: 17.21℃
最低気温: 15.84℃
最高気温: 19.88℃
現在の風向: 北東
風速: 0.89m/s
現在の湿度: 42%
日出: 2021-11-15 06:16:52(JST)
日没: 2021-11-15 16:34:55(JST)
```

- TwitterSpaces情報取得

TwitterSpaces検索APIを利用して、指定したアカウントがスペースを開催していた場合その情報を返します。

`>> supervise_spaces TwitterID` と送ることで、開催時は以下の情報を返します。

```text
スペースが現在開催中です。

    タイトル：ここにタイトル名が入ります
    https://twitter.com/i/spaces/スペースID

    開始時間： YYYY/MM/DD HH:mm:ss
    現在0人が参加中です
    スピーカー
    Twitter名　https://twitter.com/TwitterID
```
