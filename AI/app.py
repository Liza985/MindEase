from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import logging
from werkzeug.serving import WSGIRequestHandler

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Werkzeug server
WSGIRequestHandler.protocol_version = "HTTP/1.1"

app = Flask(__name__)
CORS(app)

# Set Flask configuration
app.config.update(
    JSON_SORT_KEYS=False,
    PROPAGATE_EXCEPTIONS=True,
    ENV='development',
    FLASK_ENV='development'
)

# Initialize globals
model = None
scaler = None
feature_selector = None
label_encoder = None

def load_model_components():
    """Load all model components safely"""
    global model, scaler, feature_selector, label_encoder
    
    try:
        # Load the trained model and preprocessing objects
        model_path = os.path.join(os.path.dirname(__file__), 'depression_model.joblib')
        scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.joblib')
        selector_path = os.path.join(os.path.dirname(__file__), 'feature_selector.joblib')
        encoder_path = os.path.join(os.path.dirname(__file__), 'label_encoder.joblib')
        
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        feature_selector = joblib.load(selector_path)
        label_encoder = joblib.load(encoder_path)
        logger.info("Successfully loaded all model components")
        return True
        
    except Exception as e:
        logger.error(f"Error loading model components: {str(e)}")
        return False

# Load model components on startup
if not load_model_components():
    raise RuntimeError("Failed to load model components")

def create_feature_interactions(features):
    """Create interaction features between important symptoms"""
    features = features.copy()
    
    # Core symptom interactions
    features['mood_energy'] = np.sqrt(features['Hopelessness'] * features['Fatigue']) / 2.236
    features['suicide_worth'] = np.sqrt(features['Suicidal Ideation'] * features['Worthlessness']) / 2.236
    features['mood_sleep'] = np.sqrt(features['Hopelessness'] * features['Sleep']) / 2.236
    
    # Physical symptom interactions
    features['sleep_fatigue'] = np.sqrt(features['Sleep'] * features['Fatigue']) / 2.236
    features['appetite_energy'] = np.sqrt(features['Appetite'] * features['Low Energy']) / 2.236
    
    # Cognitive interactions
    features['concentration_agitation'] = np.sqrt(features['Concentration'] * features['Agitation']) / 2.236
    features['hopeless_worth'] = np.sqrt(features['Hopelessness'] * features['Worthlessness']) / 2.236
    
    # Compound features
    features['physical_distress'] = np.sqrt((features['Sleep']**2 + features['Appetite']**2 + features['Fatigue']**2) / 3)
    features['emotional_distress'] = np.sqrt((features['Hopelessness']**2 + features['Worthlessness']**2 + features['Interest']**2) / 3)
    features['cognitive_distress'] = np.sqrt((features['Concentration']**2 + features['Agitation']**2 + features['Suicidal Ideation']**2) / 3)
    
    return features

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ensure model components are loaded
        global model, scaler, feature_selector, label_encoder
        if any(x is None for x in [model, scaler, feature_selector, label_encoder]):
            if not load_model_components():
                return jsonify({'error': 'Model components not available'}), 500
        
        # Get input data
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Create feature array with correct keys
        features = {
            'Sleep': float(data.get('Sleep', 0)),
            'Appetite': float(data.get('Appetite', 0)),
            'Interest': float(data.get('Interest', 0)),
            'Fatigue': float(data.get('Fatigue', 0)),
            'Worthlessness': float(data.get('Worthlessness', 0)),
            'Concentration': float(data.get('Concentration', 0)),
            'Agitation': float(data.get('Agitation', 0)),
            'Suicidal Ideation': float(data.get('SuicidalIdeation', 0)),
            'Sleep Disturbance': float(data.get('SleepDisturbance', 0)),
            'Aggression': float(data.get('Aggression', 0)),
            'Panic Attacks': float(data.get('PanicAttacks', 0)), 
            'Hopelessness': float(data.get('Hopelessness', 0)),
            'Restlessness': float(data.get('Restlessness', 0)),
            'Low Energy': float(data.get('LowEnergy', 0))
        }
        
        # Create feature interactions
        features_with_interactions = create_feature_interactions(features)
        
        # Convert to array and scale
        X = np.array(list(features_with_interactions.values())).reshape(1, -1)
        X_scaled = scaler.transform(X)
        
        # Select features
        X_selected = feature_selector.transform(X_scaled)
        
        # Get prediction and probabilities
        prediction = model.predict(X_selected)[0]
        probabilities = model.predict_proba(X_selected)[0]
        
        # Get prediction label and confidence
        pred_label = label_encoder.inverse_transform([prediction])[0]
        confidence = float(probabilities.max())
        
        # Special handling for critical cases
        if float(features['Suicidal Ideation']) >= 4:
            pred_label = 'Severe'
            confidence = 0.95
        
        # Return prediction with confidence
        return jsonify({
            'prediction': pred_label,
            'confidence': confidence,
            'probabilities': {
                label: float(prob) 
                for label, prob in zip(label_encoder.classes_, probabilities)
            }
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Disable Flask reloader when in debug mode
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True,
        use_reloader=False  # Disable reloader to prevent watchdog issues
    )