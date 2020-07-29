import requests
from pprint import pprint
import urllib.parse

class Weather():
    def __init__(self):
        self.api = 'http://api.aitc.jp/jmardb-api/search?'
    
    def search(self, location, dateFrom, dateTo):
        url = self.api + 'datetime=' + dateFrom + 'datetime=' + dateTo + 'title=' + urllib.parse.quote(location)
        pprint(url)
        res = requests.get(url)
        return res


test = Weather()
pprint(test.search('府県天気概況', '2020-07-02', '2020-07-02'))