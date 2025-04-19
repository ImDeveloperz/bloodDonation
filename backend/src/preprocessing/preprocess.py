# src/preprocessing/preprocess.py
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE

from imblearn.over_sampling import ADASYN, BorderlineSMOTE
from imblearn.combine import SMOTETomek, SMOTEENN

def load_data(filepath):
    """Charge le fichier CSV et renomme les colonnes."""
    df = pd.read_csv(filepath)
    df.columns = ['Recency', 'Frequency', 'Monetary', 'Time', 'Target']
    df.columns = df.columns.str.strip()
    return df

def preprocess_data(df):
    """Sépare les features et la cible, applique une standardisation."""
    X = df.drop('Target', axis=1)
    y = df['Target']
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, scaler

def balance_data_with_smote(X, y, random_state=42):
    """
    Équilibre les données en utilisant la technique SMOTE.
    
    Parameters:
    -----------
    X : array-like, shape (n_samples, n_features)
        Les données des features.
    y : array-like, shape (n_samples,)
        Les données de la cible.
    random_state : int, default=42
        Contrôle le caractère aléatoire de la génération d'échantillons.
        
    Returns:
    --------
    X_balanced : array-like
        Les données des features équilibrées.
    y_balanced : array-like
        Les données de la cible équilibrées.
    """
    smote = SMOTE(random_state=random_state)
    X_balanced, y_balanced = smote.fit_resample(X, y)
    
    # Afficher les statistiques sur l'équilibrage
    print("Distribution des classes avant équilibrage:")
    print(pd.Series(y).value_counts())
    print("\nDistribution des classes après équilibrage:")
    print(pd.Series(y_balanced).value_counts())
    
    return X_balanced, y_balanced

# Add to preprocess.py
def engineer_features(df):
    """Create new features that might improve model performance."""
    # Create ratio features
    df['Recency_to_Time'] = df['Recency'] / df['Time']
    df['Frequency_to_Time'] = df['Frequency'] / df['Time']
    df['Monetary_to_Frequency'] = df['Monetary'] / (df['Frequency'] + 0.001)  # Avoid division by zero
    
    # Create interaction features
    df['Recency_x_Frequency'] = df['Recency'] * df['Frequency']
    df['Monetary_x_Frequency'] = df['Monetary'] * df['Frequency']
    
    # Create statistical features
    df['Donation_Rate'] = df['Frequency'] / df['Time']
    
    return df


def balance_data_with_adasyn(X, y):
    """Balance data using ADASYN."""
    adasyn = ADASYN(random_state=42)
    return adasyn.fit_resample(X, y)

def balance_data_with_smote_tomek(X, y):
    """Balance data using SMOTE+Tomek links."""
    smote_tomek = SMOTETomek(random_state=42)
    return smote_tomek.fit_resample(X, y)

def balance_data_with_smote_enn(X, y):
    """Balance data using SMOTE+ENN."""
    smote_enn = SMOTEENN(random_state=42)
    return smote_enn.fit_resample(X, y)

def split_data(X, y, test_size=0.2, random_state=42):
    """Divise les données en ensembles d'entraînement et de test."""
    return train_test_split(X, y, test_size=test_size, stratify=y, random_state=random_state)