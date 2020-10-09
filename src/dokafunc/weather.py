import requests
import json
from googletrans import Translator

class Weather():
    """Weather

    天気予報データ取得インスタンス

    """


    def __init__(self, token: str):
        self.api = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + token
        self.weather_icon = ' http://openweathermap.org/img/wn/'

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

        res = self.parseData(forecast_obj)

        return res

    def parseData(self, obj: dict) -> str:
        """parseData
        天気予報データをパース

        Arguments:
            obj dict: 天気予報オブジェクトデータ

        Returns:
            str: パース後データ
        """

        weather_name = obj['weather'][0]['description']
        weather_icon = self.weather_icon + obj['weather'][0]['icon'] + '@2x.png'

        self.current_temp = obj['main']['temp']
        self.feels_temp   = obj['main']['feels_like']
        self.temp_min     = obj['main']['temp_min']
        self.temp_max     = obj['main']['temp_max']
        self.humidity     = obj['main']['humidity']

        return weather_name