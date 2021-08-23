import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

TOKEN = os.environ.get("TOKEN")
WEATHER_TOKEN = os.environ.get("WEATHER_TOKEN")
TWITTER_BEARER = os.environ.get("TWITTER_API_BEARER")
DISCORD_ROOM_FOR_STREAM = os.environ.get("DISCORD_ROOM_FOR_STREAM")
YUMA_MHS_TWITTER_ID = os.environ.get("YUMA_MHS_TWITTER_ID")

HAL = os.environ.get("HAL_DISCORD_ID")
YUMA = os.environ.get("YUMA_DISCORD_ID")
BIKKY = os.environ.get("BIKKY_DISCORD_ID")