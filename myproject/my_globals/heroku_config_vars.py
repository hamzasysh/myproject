# from dotenv import load_dotenv
# import os
# load_dotenv()


# host=os.getenv('HOST')
# db=os.getenv('DB')

try:
    import environ

    env = environ.Env()
    environ.Env.read_env()
    mongo_uri=env.str('MONGO_URI')
    db=env.str('DB')
except:
    pass
    # from dotenv import load_dotenv
    # import os
    # load_dotenv()
    # mongo_uri=os.getenv('MONGO_URI')
    # db=os.getenv('DB')
