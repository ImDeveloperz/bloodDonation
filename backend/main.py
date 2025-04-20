import os
from fastapi import FastAPI, HTTPException
import joblib
from pydantic import BaseModel
from typing import List
import numpy as np
import pickle as pkl
from fastapi.middleware.cors import CORSMiddleware
from userApi import router as user_router  # User-related API
import sys
sys.path.append(os.path.abspath('.'))  # Workaround for module path issues
import auth  # Authentication (Firebase-based)
import chatboot
import notif
# Load XGBoost model and scaler
try:
    model = joblib.load("./data/xgboost_model_tuned.pkl")
    scaler = joblib.load("./data/scaler.pkl")
    print("Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model & scaler: {e}")
    raise

# FastAPI app initialization
app = FastAPI(title="XGBoost Batch Prediction API")
app.include_router(user_router)  # Include user-related routes
app.include_router(auth.router)  # Include authentication routes
app.include_router(chatboot.router)
app.include_router(notif.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (update for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for input sample
class Sample(BaseModel):
    recency: float
    frequency: float
    time: float

# Pydantic model for batch input
class BatchInput(BaseModel):
    samples: List[Sample]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def predict(input_batch: BatchInput):
    try:
        # Convert input samples into a 2D numpy array
        data = np.array([
            [sample.recency, sample.frequency, sample.time]
            for sample in input_batch.samples
        ])
        
        # Scale data before making predictions
        scaled_data = scaler.transform(data)
        
        # Make predictions with the XGBoost model
        predictions = model.predict(scaled_data)
        
        # Return predictions
        return {"predictions": predictions.tolist()}
    except Exception as e:
        # Handle errors (e.g., invalid input or model issues)
        raise HTTPException(status_code=400, detail=str(e))

# Run FastAPI server on localhost:8000
if __name__ == "__main__":
    print("Starting server...")
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
