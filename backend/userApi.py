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




@router.post("/donors/add-or-update")
async def add_or_update_donor(donor: dict):
    donors_ref = db.reference("donors")
    donors = donors_ref.get() or {}

    cin = donor.get("cin")
    if not cin:
        raise HTTPException(status_code=400, detail="CIN is required.")

    now_str = datetime.now().strftime("%Y-%m-%d")
    existing_donor_id = None

    # Find existing donor by CIN
    for donor_id, d in donors.items():
        if d.get("cin") == cin:
            existing_donor_id = donor_id
            break

    if existing_donor_id:
        existing_donor = donors[existing_donor_id]
        last_donation_str = existing_donor.get("last_donation_date")

        if last_donation_str:
            try:
                last_donation_date = datetime.strptime(last_donation_str, "%Y-%m-%d")
                six_months_ago = datetime.now() - timedelta(days=6 * 30)

                if last_donation_date <= six_months_ago:
                    updated_freq = existing_donor.get("frequence", 0) + 1
                    donors_ref.child(existing_donor_id).update({
                        "frequence": updated_freq,
                        "last_donation_date": now_str
                    })
                    return {
                        "status": "updated",
                        "message": "Existing donor updated after 6+ months.",
                        "donor_id": existing_donor_id,
                        "frequence": updated_freq
                    }
                else:
                    return {
                        "status": "recent",
                        "message": "Donation too recent (< 6 months).",
                        "donor_id": existing_donor_id,
                        "frequence": existing_donor.get("frequence", 0)
                    }
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid last_donation_date format.")

        else:
            # No previous donation date
            donors_ref.child(existing_donor_id).update({
                "last_donation_date": now_str,
                "frequence": 1
            })
            return {
                "status": "initialized",
                "message": "First donation date initialized.",
                "donor_id": existing_donor_id,
                "frequence": 1
            }

    else:
        # Donor doesn't exist: create new
        new_id = f"donor{len(donors)+1}"
        donor["id"] = new_id
        donor["frequence"] = 1
        donor["first_donation_date"] = now_str
        donor["last_donation_date"] = now_str

        new_ref = donors_ref.child(new_id)
        new_ref.set(donor)

        return {
            "status": "created",
            "message": "New donor added.",
            "donor_id": new_id
        }
