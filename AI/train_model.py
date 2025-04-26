import pandas as pd
import numpy as np
from sklearn.model_selection import cross_val_score, GridSearchCV, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_selection import SelectFromModel
import joblib

def create_feature_interactions(X):
    """Create interaction features between important symptoms"""
    X = X.copy()
    
    # Core symptom interactions with normalized weights
    X['mood_energy'] = np.sqrt(X['Hopelessness'] * X['Fatigue']) / 2.236
    X['suicide_worth'] = np.sqrt(X['Suicidal Ideation'] * X['Worthlessness']) / 2.236
    X['mood_sleep'] = np.sqrt(X['Hopelessness'] * X['Sleep']) / 2.236
    
    # Physical symptom interactions
    X['sleep_fatigue'] = np.sqrt(X['Sleep'] * X['Fatigue']) / 2.236
    X['appetite_energy'] = np.sqrt(X['Appetite'] * X['Low Energy']) / 2.236
    
    # Cognitive interactions
    X['concentration_agitation'] = np.sqrt(X['Concentration'] * X['Agitation']) / 2.236
    X['hopeless_worth'] = np.sqrt(X['Hopelessness'] * X['Worthlessness']) / 2.236
    
    # Compound features
    X['physical_distress'] = np.sqrt((X['Sleep']**2 + X['Appetite']**2 + X['Fatigue']**2) / 3)
    X['emotional_distress'] = np.sqrt((X['Hopelessness']**2 + X['Worthlessness']**2 + X['Interest']**2) / 3)
    X['cognitive_distress'] = np.sqrt((X['Concentration']**2 + X['Agitation']**2 + X['Suicidal Ideation']**2) / 3)
    
    return X

def select_features(X, y):
    """Select features using percentile-based threshold"""
    rf = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )
    
    selector = SelectFromModel(
        estimator=rf,
        threshold='mean',
        prefit=False
    )
    selector.fit(X, y)
    return selector

def train_and_evaluate_models(data_file):
    """Train and evaluate models using optimized ensemble approach"""
    
    # Load and prepare data
    df = pd.read_csv(data_file)
    
    features = ['Sleep', 'Appetite', 'Interest', 'Fatigue', 'Worthlessness',
               'Concentration', 'Agitation', 'Suicidal Ideation', 'Sleep Disturbance',
               'Aggression', 'Panic Attacks', 'Hopelessness', 'Restlessness', 'Low Energy']
    
    X = df[features]
    y = df['Depression State']
    
    # Feature engineering
    X = create_feature_interactions(X)
    
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Feature selection
    print("\nPerforming feature selection...")
    selector = select_features(X_scaled, y_encoded)
    X_selected = selector.transform(X_scaled)
    print(f"Selected {X_selected.shape[1]} features out of {X_scaled.shape[1]}")
    
    # Calculate balanced class weights
    class_counts = np.bincount(y_encoded)
    total_samples = len(y_encoded)
    class_weights = {i: total_samples / (len(class_counts) * count) for i, count in enumerate(class_counts)}
    
    # Define base models with balanced parameters
    rf = RandomForestClassifier(
        n_estimators=200,
        class_weight=class_weights,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    
    gb = GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.05,
        max_depth=5,
        min_samples_split=4,
        subsample=0.8,
        random_state=42
    )
    
    svm = SVC(
        C=10,
        gamma='scale',
        kernel='rbf',
        probability=True,
        class_weight=class_weights,
        random_state=42
    )
    
    # Create voting classifier with optimized weights
    voting_clf = VotingClassifier(
        estimators=[
            ('rf', rf),
            ('gb', gb),
            ('svm', svm)
        ],
        voting='soft',
        weights=[2, 1, 1]  # Give more weight to Random Forest
    )
    
    # Train the ensemble model
    print("\nTraining ensemble model...")
    voting_clf.fit(X_selected, y_encoded)
    
    # Make predictions
    y_pred = voting_clf.predict(X_selected)
    
    # Print evaluation metrics
    print("\nFinal Model Evaluation:")
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_encoded, y_pred))
    
    print("\nClassification Report:")
    print(classification_report(y_encoded, y_pred, target_names=le.classes_))
    
    # Save the model and preprocessing objects
    joblib.dump(voting_clf, 'depression_model.joblib')
    joblib.dump(scaler, 'scaler.joblib')
    joblib.dump(selector, 'feature_selector.joblib')
    joblib.dump(le, 'label_encoder.joblib')
    print("\nModel, scaler, feature selector, and label encoder saved successfully!")
    
    return voting_clf, scaler, selector, le

if __name__ == "__main__":
    data_file = "cleaned_dataset.csv"
    model, scaler, selector, label_encoder = train_and_evaluate_models(data_file)