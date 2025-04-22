from fastapi import APIRouter, HTTPException, Query
from firebase_admin import db
from pydantic import BaseModel
import firebase_config  # Firebase setup file
from datetime import datetime, timedelta

# Initialize FastAPI router for user/donor endpoints
router = APIRouter()


# ------------------------- Pydantic Models -------------------------


# Pydantic model for Hospital User
class HospitalUser(BaseModel):
    """
    Represents a hospital user with authentication and hospital-specific metadata.
    """
    id: str
    email: str
    password: str
    role: str
    city: str
    nom_hospital: str


# ------------------------- Routes: Donors (Hospital-Linked Accounts) -------------------------


@router.post("/users")
async def add_user(user: HospitalUser):
    """
    Add a new donor account (hospital-affiliated) to Firebase.

    Args:
        user (HospitalUser): Donor account with hospital details.

    Returns:
        dict: Success message and donor ID.
    """
    ref = db.reference("users_hospital_bank")
    ref.child(user.id).set(user.dict())
    return {"status": "success", "id": user.id}

@router.get("/users")
async def get_users():
    """
    Retrieve all hospital-linked donor accounts.

    Returns:
        dict: Dictionary of donors or empty if none exist.
    """
    ref = db.reference("users_hospital_bank")
    users = ref.get()
    return users or {}


# ------------------------- Routes: Donor Records -------------------------


# Add and get donors
@router.post("/donors")
async def add_donor(donor: dict):
    """
    Add a new individual donor record.

    Args:
        donor (dict): Donor data (e.g., name, cin, hospital_id, etc.).

    Returns:
        dict: Firebase-generated donor ID and status.
    """
    ref = db.reference("donors")
    new_ref = ref.push(donor)
    return {"id": new_ref.key, "status": "success"}

@router.get("/donations")
async def get_donations_by_hospital(hospital: str = Query(...)):
    """
    Retrieve all donor records associated with a specific hospital.

    Args:
        hospital (str): Hospital name to match against donor affiliations.

    Returns:
        list or tuple: List of matching donors or an error if none found.
    """
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


# ------------------------- Route: Add or Update Donor -------------------------


@router.post("/donors/add-or-update")
async def add_or_update_donor(donor: dict):
    """
    Add a new donor or update an existing donor's donation frequency and date based on CIN.

    Logic:
    - If donor exists and last donation was over 3 months ago → update frequency and date.
    - If last donation was recent → do not update.
    - If donor doesn't exist → create new record with initial values.

    Args:
        donor (dict): Donor payload (must include `cin`).

    Returns:
        dict: Operation result and donor metadata.
    """
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
                three_months_ago = datetime.now() - timedelta(days=3 * 30)

                if last_donation_date <= three_months_ago:
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
                        "message": "Donation too recent (< 3 months).",
                        "donor_id": existing_donor_id,
                        "frequence": existing_donor.get("frequence", 0)
                    }
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid last_donation_date format.")

        else:
            # Donor found but no previous donation recorded
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
        new_id = f"donor{len(donors)+1}_{cin}"
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



# ------------------------- Route: Check if a donnation too recent (< 3 Months) or not if not then he can donate and we will add one to the frequence(number of donations) -------------------------


@router.post("/donors/{donor_id}/check-donation")
async def check_and_update_frequency(donor_id: str):
    donors_ref = db.reference("donors")
    donor = donors_ref.child(donor_id).get()

    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")

    last_donation_date_str = donor.get("last_donation_date")
    if not last_donation_date_str:
        return {"message": "No donation date found", "frequence": donor.get("frequence", 0)}

    # Parse the last donation date
    try:
        last_donation_date = datetime.strptime(last_donation_date_str, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid donation date format")

    six_months_ago = datetime.now() - timedelta(days=3 * 30)  # Approximation
    if last_donation_date <= six_months_ago:
        # Update the frequency
        current_freq = donor.get("frequence", 0)
        donor["frequence"] = current_freq + 1
        donors_ref.child(donor_id).update({
            "frequence": donor["frequence"],
            "last_donation_date": datetime.now().strftime("%Y-%m-%d")  # Optionally update last date
        })
        return {"message": "Donation frequency updated", "frequence": donor["frequence"]}
    else:
        return {"message": "Donation too recent", "frequence": donor.get("frequence", 0)}
