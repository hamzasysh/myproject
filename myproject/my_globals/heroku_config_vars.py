import environ

env = environ.Env()
environ.Env.read_env()

try:   
    mongo_uri=env.str('MONGO_URI')
except:
    mongo_uri = 'mongodb://dev:oaiipv8wyg912urtn@202.163.113.3:27017'
    
try:
    db=env.str('DB')
except:
    db = 'sea-turtle'