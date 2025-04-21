# src/preprocessing/preprocess.py
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE

from imblearn.over_sampling import ADASYN, BorderlineSMOTE
from imblearn.combine import SMOTETomek, SMOTEENN

def load_data(filepath):
    """Load CSV file and rename the columns."""
    df = pd.read_csv(filepath)
    df.columns = ['Recency', 'Frequency', 'Monetary', 'Time', 'Target']
    df.columns = df.columns.str.strip()
    return df

def preprocess_data(df):
    """
    Preprocesses the input data by separating features and target, and applying standardization.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        Input dataframe containing both features and target variable.
        
    Returns:
    --------
    X_scaled : numpy.ndarray
        Scaled feature matrix
    y : pandas.Series
        Target variable
    scaler : StandardScaler
        Fitted scaler object for potential later use
    """
    X = df.drop('Target', axis=1)
    y = df['Target']
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, scaler

def balance_data_with_smote(X, y, random_state=42):
    """
    Balances imbalanced dataset using SMOTE (Synthetic Minority Over-sampling Technique).
    
    Parameters:
    -----------
    X : array-like, shape (n_samples, n_features)
        Feature matrix
    y : array-like, shape (n_samples,)
        Target vector
    random_state : int, default=42
        Random seed for reproducibility
        
    Returns:
    --------
    X_balanced : numpy.ndarray
        Balanced feature matrix with synthetic samples
    y_balanced : numpy.ndarray
        Balanced target vector
        
    Notes:
    ------
    - SMOTE creates synthetic samples for minority class(es) rather than simple oversampling
    - Prints class distribution before and after balancing for verification
    """

    # Initialize SMOTE object with specified random state
    smote = SMOTE(random_state=random_state)
    
    # Apply SMOTE to generate synthetic samples and balance classes
    X_balanced, y_balanced = smote.fit_resample(X, y)
    
    # Display class distribution before and after balancing    print("Distribution des classes avant équilibrage:")
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