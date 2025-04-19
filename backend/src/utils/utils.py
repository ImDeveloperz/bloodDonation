# src/utils/utils.py

import joblib
import os

def save_scaler(scaler, path="scaler.pkl"):
    """Sauvegarde le scaler avec joblib."""
    joblib.dump(scaler, path)
    print(f"Scaler sauvegardé dans : {path}")

def load_scaler(path="scaler.pkl"):
    """Charge un scaler déjà sauvegardé."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"Scaler introuvable à l’emplacement : {path}")
    return joblib.load(path)
