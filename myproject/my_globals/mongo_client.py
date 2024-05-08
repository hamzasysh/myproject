from myproject.my_globals.heroku_config_vars import *
from pymongo import MongoClient


client = MongoClient(mongo_uri)
sea_turtle_db = client['sea-turtle']  # Database name
test_db = client['test']  # Database name