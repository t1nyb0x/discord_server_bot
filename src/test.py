import sys
import dokafunc
import pprint
from settings import apitoken

weather = dokafunc.weather.Weather(apitoken.WEATHER_TOKEN)
pprint(weather.search('Kawagoe'))