import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Sample dataset
data = {
    'age': [25, 30, 35, 40, 45],
    'weight': [60, 70, 80, 90, 100],
    'height': [170, 175, 180, 185, 190],
    'activity_level': [1, 2, 3, 1, 2],  # 1: Low, 2: Moderate, 3: High
    'fitness_score': [50, 60, 70, 80, 90]  # Example fitness scores
}

# Convert the data into a pandas DataFrame
df = pd.DataFrame(data)

# Features (independent variables) and Target (dependent variable)
X = df[['age', 'weight', 'height', 'activity_level']]
y = df['fitness_score']

# Initialize and train the model
model = LinearRegression()
model.fit(X, y)

# Save the trained model to a .pkl file using pickle
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)

print("Model training completed and saved as model.pkl")
