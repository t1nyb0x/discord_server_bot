import requests
from pprint import pprint
import json

class Weather():
    """
    天気インスタンス
    """
    def __init__(self, token):
        self.api = 'http://api.openweathermap.org/data/2.5/weather?appid=' + token
        # self.api = 'http://api.openweathermap.org/data/2.5/weather?appid=ba39a2a0a9e627c2390fd27f7b60213b'
    
    def search(self, cityName):
        url = self.api + '&q=' + cityName
        pprint(url)
        res = requests.get(url)
        data = res.json()
        pprint(data)
        return data
