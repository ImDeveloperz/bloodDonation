from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, db
import jwt
import datetime
import firebase_config
router = APIRouter()


class LoginRequest(BaseModel):
    # Schema for incoming login request data.
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    """
    Handles user login by validating credentials against Firebase Realtime Database.

    Parameters:
        data (LoginRequest): The email and password sent in the request body.

    Returns:
        dict: A dictionary containing user information if authentication is successful.

    Raises:
        HTTPException: If no users exist, the password is incorrect, or the user is not found.
    """
    # Reference the "users_hospital_bank" node in Firebase Realtime Database
    users_ref = db.reference("users_hospital_bank")
    users = users_ref.get()

    if not users:
        raise HTTPException(status_code=401, detail="No users found")

    # Iterate over users to find a match by email
    for user_id, user_data in users.items():
        if user_data["email"] == data.email:
            # Validate the password
            if user_data["password"] != data.password:
                raise HTTPException(status_code=401, detail="Incorrect password")
            
            # Return selected user details on successful login
            return {
                "user": {
                    "id": user_id,
                    "email": user_data["email"],
                    "city": user_data.get("city"),
                    "nom_hospital": user_data.get("nom_hospital"),
                    "role": user_data.get("role")
                },
            }

    raise HTTPException(status_code=401, detail="User not found")
