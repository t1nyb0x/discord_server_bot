import requests
from pprint import pprint
import json
import apitoken

class Weather():
    def __init__(self):
        self.api = 'http://api.openweathermap.org/data/2.5/weather?appid=' + WEATHER_TOKEN
        # self.api = 'http://api.openweathermap.org/data/2.5/weather?appid=ba39a2a0a9e627c2390fd27f7b60213b'
    
    def search(self, cityName):
        url = self.api + '&q=' + cityName
        pprint(url)
        res = requests.get(url)
        data = res.json()
        return data


test = Weather()
pprint(test.search('Kawagoe'))
print(WEATHER_TOKEN)