import urllib
from lxml import etree

XML_URL = "http://weather.livedoor.com/forecast/rss/primary_area.xml"
req = urllib.request.Request(XML_URL)

# TODO: ここの意味を理解すること
with urllib.request.urlopen(req) as response:
    xmlData = response.read()

# ldWeather空間を定義
namespace = {'ldWeather': 'http://weather.livedoor.com/%5C/ns/rss/2.0'}
xmlData = etree.parse(XML_URL)
root = xmlData.getroot()
forecastRss = {}
# prefList = xmlData.xpath("//ldWeather:source/pref",namespaces=namespace)

# pref要素取得
prefList = xmlData.xpath("//pref")
for pref in prefList:
    # 取得したprefのtitle属性を利用して、prefタグ配下の子要素を全て取得する
    prefName = pref.attrib['title']
    cityList = xmlData.xpath("//pref[@title='" + prefName + "']/*")

    for data in cityList:
        print(data.attrib)


