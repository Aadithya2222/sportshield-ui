import React, { useState } from 'react';

function FitnessApp() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Fitness Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div>
          <label>Height (cm):</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} required />
        </div>
        <div>
          <label>Activity Level (1-3):</label>
          <input type="number" name="activityLevel" value={formData.activityLevel} onChange={handleChange} required />
        </div>
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div>
          <h3>Fitness Score: {prediction.fitness_score.toFixed(2)}</h3>
          <p>{prediction.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default FitnessApp;
