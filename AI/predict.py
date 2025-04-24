import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Get the directory containing this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class DepressionPredictor:
    def __init__(self):
        self.model = None
        self.load_model()
        
    def load_model(self):
        # Load the dataset using absolute path
        data = pd.read_csv(os.path.join(BASE_DIR, 'dataSet.csv'))
        data = data.iloc[:540]  # Use clean data only as per notebook
        
        # Clean depression state values
        data['Depression State'] = data['Depression State'].replace({
            '5\tNo depression': 'No depression',
            '2\tNo depression': 'No depression',
            '\tSevere': 'Severe',
            '\tNo depression': 'No depression',
            '\tMild': 'Mild',
            '\tModerate': 'Moderate'
        })
        
        # Convert depression states to numerical values
        depression_map = {
            'No depression': 0,
            'Mild': 1,
            'Moderate': 2, 
            'Severe': 3
        }
        data['Depression State'] = data['Depression State'].map(depression_map)
        
        # Prepare features and target
        X = data.drop(['Number ', 'Depression State'], axis=1)
        y = data['Depression State']
        
        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X, y)
        
        # Save model using absolute path
        joblib.dump(self.model, os.path.join(BASE_DIR, 'depression_model.joblib'))
    
    def predict(self, features):
        """
        Make prediction using the trained model
        
        Args:
            features (dict): Dictionary containing the 14 assessment features
            
        Returns:
            dict: Prediction results including depression level and confidence scores
        """
        # Convert input features to DataFrame
        feature_df = pd.DataFrame([features])
        
        # Make prediction
        prediction = self.model.predict(feature_df)[0]
        probabilities = self.model.predict_proba(feature_df)[0]
        
        # Map numerical prediction back to label
        depression_map = {
            0: 'No depression',
            1: 'Mild',
            2: 'Moderate',
            3: 'Severe'
        }
        
        result = {
            'prediction': depression_map[prediction],
            'confidence': float(max(probabilities)),
            'probabilities': {
                'No depression': float(probabilities[0]),
                'Mild': float(probabilities[1]),
                'Moderate': float(probabilities[2]), 
                'Severe': float(probabilities[3])
            }
        }
        
        return result

# Create Flask API endpoint
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
predictor = DepressionPredictor()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        result = predictor.predict(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    print("Starting ML model server on http://localhost:5000")
    print("Loading model and dataset from:", BASE_DIR)
    app.run(port=5000)