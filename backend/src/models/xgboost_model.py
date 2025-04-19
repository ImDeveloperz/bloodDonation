# src/models/xgboost_model.py
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import numpy as np
from sklearn.model_selection import GridSearchCV
import matplotlib.pyplot as plt
import seaborn as sns

def train_xgboost(X_train, y_train):
    """
    Entraîne un modèle XGBoost sur les données d'entraînement.
    
    Parameters:
    -----------
    X_train : array-like
        Données d'entraînement (features).
    y_train : array-like
        Labels d'entraînement.

    Returns:
    --------
    model : XGBClassifier
        Modèle entraîné.
    """
    # Model initialization with balanced class weights
    model = XGBClassifier(
        scale_pos_weight=1,  # Automatically balanced by SMOTE
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42
    )
    
    # Train the model
    model.fit(X_train, y_train)
    
    return model

def tune_xgboost(X_train, y_train, cv=5):
    """
    Optimise les hyperparamètres du modèle XGBoost en utilisant GridSearchCV.
    
    Parameters:
    -----------
    X_train : array-like
        Données d'entraînement (features).
    y_train : array-like
        Labels d'entraînement.
    cv : int, default=5
        Nombre de folds pour la validation croisée.
        
    Returns:
    --------
    best_model : XGBClassifier
        Modèle XGBoost avec les meilleurs paramètres.
    """
    print("Démarrage de l'optimisation des hyperparamètres...")
    
    # Define parameter grid
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [3, 4, 5, 6],
        'learning_rate': [0.01, 0.05, 0.1],
        'subsample': [0.8, 0.9, 1.0],
        'colsample_bytree': [0.8, 0.9, 1.0],
        'min_child_weight': [1, 3, 5]
    }
    
    # Initialize model
    xgb = XGBClassifier(
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42
    )
    
    # Set up GridSearchCV
    grid_search = GridSearchCV(
        estimator=xgb,
        param_grid=param_grid,
        scoring='f1',  # Using F1 score to balance precision and recall
        cv=cv,
        n_jobs=-1,  # Use all available processors
        verbose=1
    )
    
    # Fit GridSearchCV
    grid_search.fit(X_train, y_train)
    
    # Print results
    print(f"Meilleurs paramètres: {grid_search.best_params_}")
    print(f"Meilleur score F1: {grid_search.best_score_:.4f}")
    
    return grid_search.best_estimator_

def evaluate_model(model, X_test, y_test):
    """
    Évalue les performances du modèle sur les données de test.
    
    Parameters:
    -----------
    model : XGBClassifier
        Modèle entraîné.
    X_test : array-like
        Données de test (features).
    y_test : array-like
        Labels de test.
    """
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    print(f"✅ Accuracy: {accuracy}")
    
    # Print classification report
    print("📊 Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    
    # Plot confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('../confusion_matrix.png')
    
    # Feature importance
    if hasattr(model, 'feature_importances_'):
        plt.figure(figsize=(10, 6))
        sorted_idx = np.argsort(model.feature_importances_)
        plt.barh(range(len(sorted_idx)), model.feature_importances_[sorted_idx])
        plt.yticks(range(len(sorted_idx)), np.array(['Recency', 'Frequency', 'Monetary', 'Time'])[sorted_idx])
        plt.title('Feature Importance')
        plt.tight_layout()
        plt.savefig('../feature_importance.png')
    
    return accuracy

def save_model(model, path):
    """
    Sauvegarde le modèle XGBoost dans un fichier.
    
    Parameters:
    -----------
    model : XGBClassifier
        Modèle à sauvegarder.
    path : str
        Chemin où sauvegarder le modèle.
    """
    joblib.dump(model, path)
    print(f"💾 Modèle XGBoost sauvegardé dans : {path}")