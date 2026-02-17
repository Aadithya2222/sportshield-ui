from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model (make sure model.pkl is in the same folder as app.py)
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.get_json()

        # Extract values from the request
        age = data['age']
        weight = data['weight']
        height = data['height']
        activity_level = data['activityLevel']

        # Prepare the features for prediction
        features = np.array([[age, weight, height, activity_level]])

        # Make the prediction using the model
        fitness_score = model.predict(features)[0]

        # Example recommendation based on fitness score
        if fitness_score > 75:
            recommendation = "Great fitness! Keep it up."
        elif fitness_score > 50:
            recommendation = "Good fitness. Consider increasing your activity level."
        else:
            recommendation = "Low fitness. Consult a fitness coach."

        # Return the prediction and recommendation
        return jsonify({
            'fitness_score': fitness_score,
            'recommendation': recommendation
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)
