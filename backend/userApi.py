from fastapi import APIRouter, HTTPException, Query
from firebase_admin import db
from pydantic import BaseModel
import firebase_config  # Firebase setup file
from datetime import datetime, timedelta

router = APIRouter()

# Pydantic model for Hospital User
class HospitalUser(BaseModel):
    id: str
    email: str
    password: str
    role: str
    city: str
    nom_hospital: str

@router.post("/users")
async def add_user(user: HospitalUser):
    # Adds a new user to Firebase database
    ref = db.reference("users_hospital_bank")
    ref.child(user.id).set(user.dict())
    return {"status": "success", "id": user.id}

@router.get("/users")
async def get_users():
    # Fetch all users from Firebase
    ref = db.reference("users_hospital_bank")
    users = ref.get()
    return users or {}

# Add and get donors
@router.post("/donors")
async def add_donor(donor: dict):
    ref = db.reference("donors")
    new_ref = ref.push(donor)
    return {"id": new_ref.key, "status": "success"}

@router.get("/donations")
async def get_donations_by_hospital(hospital: str = Query(...)):
    # Fetch donations by hospital name
    users_ref = db.reference("users_hospital_bank")
    users = users_ref.get()

    hospital_id = None
    if users:
        for key, user in users.items():
            if user.get("nom_hospital", "").lower() == hospital.lower():
                hospital_id = key
                break

    if not hospital_id:
        return {"error": "Hospital not found"}, 404

    donors_ref = db.reference("donors")
    donors = donors_ref.get()

    filtered_donors = []
    if donors:
        for donor_id, donor in donors.items():
            if donor.get("hospital_id") == hospital_id:
                donor["id"] = donor_id
                filtered_donors.append(donor)

    return filtered_donors
