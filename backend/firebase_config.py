# firebase_config.py
import firebase_admin
from firebase_admin import credentials

# Load the Firebase service account credentials from a JSON file.
# This file contains private keys and project information used to authenticate the Firebase SDK.
cred = credentials.Certificate("credentials.json")

# Initialize the Firebase app with the provided credentials and specify the target Realtime Database URL.
# This allows other parts of the app to interact with the Firebase Realtime Database.
firebase_admin.initialize_app(cred, {"databaseURL" : "https://blood-3fda1-default-rtdb.firebaseio.com/"})
