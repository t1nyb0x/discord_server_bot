import sys
import dokafunc
from settings import apitoken

weather = dokafunc.weather.Weather(apitoken.WEATHER_TOKEN)
print(weather.search('Kitahara'))