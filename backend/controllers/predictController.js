const axios = require('axios');
require('dotenv').config();

exports.predictDiagnosis = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';

    try {
      const response = await axios.post(`${pythonApiUrl}/predict`, {
        symptoms,
      });

      res.json({
        success: true,
        prediction: response.data.prediction,
        confidence: response.data.confidence,
        source: 'python_api',
      });
    } catch (pythonError) {
      console.log('Python API unavailable, using fallback:', pythonError.message);
      
      const symptomString = symptoms.join(' ').toLowerCase();
      
      let prediction = 'Unknown';
      let confidence = 0.5;

      if (symptomString.includes('fatigue') && symptomString.includes('weight gain')) {
        prediction = 'Hypothyroidism';
        confidence = 0.85;
      } else if (symptomString.includes('chest pain') && symptomString.includes('sweating')) {
        prediction = 'Heart Attack';
        confidence = 0.90;
      } else if (symptomString.includes('thirst') && symptomString.includes('frequent urination')) {
        prediction = 'Diabetes';
        confidence = 0.88;
      } else if (symptomString.includes('memory') && symptomString.includes('confusion')) {
        prediction = "Alzheimer's Disease";
        confidence = 0.75;
      } else if (symptomString.includes('anxiety') && symptomString.includes('headache')) {
        prediction = 'Hyperthyroidism';
        confidence = 0.78;
      }

      res.json({
        success: true,
        prediction,
        confidence,
        source: 'fallback',
      });
    }
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
};
