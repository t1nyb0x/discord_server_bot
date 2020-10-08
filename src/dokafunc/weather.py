import requests
import json

class Weather():
    """
    天気インスタンス
    """
    def __init__(self, token):
        self.api = 'http://api.openweathermap.org/data/2.5/weather?appid=' + token

    def search(self, cityName):
        url = self.api + '&q=' + cityName
        res = requests.get(url)
        data = res.json()
        return data
