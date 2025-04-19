from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, db
import jwt
import datetime
import firebase_config
router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    users_ref = db.reference("users_hospital_bank")
    users = users_ref.get()

    if not users:
        raise HTTPException(status_code=401, detail="No users found")

    # Search for user by email
    for user_id, user_data in users.items():
        if user_data["email"] == data.email:
            if user_data["password"] != data.password:
                raise HTTPException(status_code=401, detail="Incorrect password")
            
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
