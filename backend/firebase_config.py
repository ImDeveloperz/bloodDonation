# firebase_config.py
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL" : "https://blood-3fda1-default-rtdb.firebaseio.com/"})
