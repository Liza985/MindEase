import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from collections import Counter

def clean_and_prepare_dataset(input_file, output_file):
    """Clean and prepare the depression dataset with enhanced preprocessing"""
    
    # Read the dataset
    df = pd.read_csv(input_file)
    
    # Define features and target
    features = ['Sleep', 'Appetite', 'Interest', 'Fatigue', 'Worthlessness', 
               'Concentration', 'Agitation', 'Suicidal Ideation', 'Sleep Disturbance',
               'Aggression', 'Panic Attacks', 'Hopelessness', 'Restlessness', 'Low Energy']
    target = 'Depression State'
    
    # Clean up the Depression State column
    df[target] = df[target].str.strip()  # Remove leading/trailing whitespace
    df[target] = df[target].str.replace('\t', '')  # Remove tab characters
    df[target] = df[target].str.replace(r'^\d+', '', regex=True)  # Remove leading numbers
    
    # Drop rows with NaN in target variable
    df = df.dropna(subset=[target])
    
    # Handle missing values in features
    for col in features:
        df[col].fillna(df[col].median(), inplace=True)
    
    # Normalize features to 1-5 scale
    scaler = StandardScaler()
    df[features] = scaler.fit_transform(df[features])
    df[features] = (df[features] * 0.8 + 3).clip(1, 5)
    
    # Apply SMOTE for class balancing
    X = df[features]
    y = df[target]
    
    print("Original class distribution:")
    print(Counter(y))
    
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X, y)
    
    print("\nResampled class distribution:")
    print(Counter(y_resampled))
    
    # Create balanced dataset
    balanced_df = pd.DataFrame(X_resampled, columns=features)
    balanced_df[target] = y_resampled
    
    # Implement stratified cross-validation
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = []
    
    for fold, (train_idx, val_idx) in enumerate(skf.split(X_resampled, y_resampled)):
        print(f"\nFold {fold + 1} split sizes:")
        print(f"Training: {len(train_idx)}, Validation: {len(val_idx)}")
        
        # Store fold indices for later use
        balanced_df.loc[val_idx, 'cv_fold'] = fold
    
    # Save the cleaned and balanced dataset
    balanced_df.to_csv(output_file, index=False)
    print(f"\nCleaned and balanced dataset saved to {output_file}")
    
    return balanced_df

if __name__ == "__main__":
    input_file = "dataset.csv"  # Original dataset
    output_file = "cleaned_dataset.csv"
    
    cleaned_df = clean_and_prepare_dataset(input_file, output_file)