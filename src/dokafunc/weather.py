import requests
import json
from googletrans import Translator
import math
from datetime import datetime as dt, timedelta, timezone


class Weather():
    """Weather

    天気予報データ取得インスタンス

    """

    def __init__(self, token: str):
        self.api = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + token
        self.weather_icon_url = ' http://openweathermap.org/img/wn/'

    def search(self, city_name: str) -> str:
        """search
        天気予報データ検索

        Arguments:
            city_name str: 市名

        Returns:
            str: 天気予報データ

        TODO:
            国によって内容が変わるようにしたい
            KelvinかCelsiusか
            タイムゾーンを分けるとか
        """

        api_url = self.api + '&q=' + city_name + '&lang=ja'
        forecast_json = requests.get(api_url)
        forecast_obj = json.loads(forecast_json.text)

        if (forecast_obj['cod'] == 200):
            res = self.parseData(forecast_obj)
        elif (forecast_obj['cod'] == 404):
            res = '都市名が間違っています。郵便番号または、市名（ローマ字0を入力してください'
        else:
            res = 'サーバー側で何らかのエラーが発生しています。時間を置いてからお試しください'

        return res

    def parseData(self, obj: dict) -> str:
        """parseData
        天気予報データをパース

        Arguments:
            obj dict: 天気予報オブジェクトデータ

        Returns:
            str: パース後データ
        """

        # trans = Translator()
        # res = trans.translate(obj['name'], dest = 'ja').text

        # TODO 天気情報が複数ある場合の処理を追加すること
        # for x in obj['weather']:
        #     weather_names = format()

        weather_name = '現在の天気: ' + \
            obj['weather'][0]['main'] + ' ' + obj['weather'][0]['description']
        weather_icon = self.weather_icon_url + \
            obj['weather'][0]['icon'] + '@2x.png'

        current_temp = '現在の気温: ' + str(obj['main']['temp']) + '℃'
        feels_temp = '現在の体感温度: ' + str(obj['main']['feels_like']) + '℃'
        temp_min = '今日の最低気温: ' + str(obj['main']['temp_min']) + '℃'
        temp_max = '今日の最高気温: ' + str(obj['main']['temp_max']) + '℃'
        humidity = '現在の湿度: ' + str(obj['main']['humidity']) + '%'

        deg = obj['wind']['deg']
        wind_direction = '現在の風向: ' + self.return_wind_direction(deg)
        if ('rain' in obj):
            if ('1h' in obj['rain']):
                rain_1h = '過去1時間の降水量: ' + str(obj['rain']['1h'])

            if ('3h' in obj['rain']):
                rain_3h = '過去3時間の降水量: ' + str(obj['rain']['3h'])

        JST = timezone(timedelta(hours=+9))
        sunrise_utc = dt.fromtimestamp(
            obj['sys']['sunrise'])
        sunrise_jst = str(sunrise_utc.astimezone(JST))

        sunset_utc = dt.fromtimestamp(
            obj['sys']['sunset'])
        sunset_jst = str(sunrise_utc.astimezone(JST))

        sunrise = '今日の日出: ' + str(sunrise_utc) + '+9:00(JST)'
        sunset = '今日の日没: ' + str(sunset_utc) + '+9:00(JST)'

        res = "```今日の" + obj['name'] + "の天気情報\n" + \
            weather_name + "\n" + \
            current_temp + "\n" + \
            feels_temp + "\n" + \
            temp_min + "\n" + \
            temp_max + "\n" + \
            wind_direction + "\n" + \
            humidity + "\n" + \
            sunrise + "\n" + \
            sunset + "\n" + "```"

        return res

    def return_wind_direction(self, deg: int) -> str:
        """return_wind_direction
        degから、風向を割り出し返却する

        Arguments:
            deg int: 方位角度

        Return:
            str: 風向き

        Example:
            index = (deg / 22.5)


        """

        dname = ["北", "北北東", "北東", "東北東", "東", "東南東", "南東", "南南東",
                 "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西"]
        index = deg / 22.5
        index = math.floor(index)
        if(index > 16):
            index = 0

        return dname[index]
