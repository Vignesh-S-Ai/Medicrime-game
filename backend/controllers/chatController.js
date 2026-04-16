const cases = require('../data/cases');

const responses = {
  symptoms: [
    "Based on the symptoms described, I recommend reviewing the patient's complete medical history.",
    "The combination of symptoms could indicate several conditions. Consider running blood tests.",
    "These symptoms often appear together in metabolic or endocrine disorders.",
    "I'd suggest checking thyroid function tests given the symptom presentation.",
  ],
  treatment: [
    "Treatment options would depend on the underlying diagnosis.",
    "Early intervention typically leads to better outcomes.",
    "Consider lifestyle modifications alongside any pharmacological treatment.",
  ],
  general: [
    "That's an important observation. Let me share some clinical insights.",
    "Based on the information provided, here are my thoughts.",
    "This case presents some interesting diagnostic challenges.",
    "I recommend gathering more history before making a final diagnosis.",
  ],
  thyroid: [
    "The fatigue, weight gain, and cold intolerance are classic signs of hypothyroidism.",
    "A low heart rate combined with these symptoms strongly suggests thyroid dysfunction.",
    "Consider checking TSH and free T4 levels for thyroid assessment.",
  ],
  heart: [
    "Chest pain with radiation to the arm is a cardiac red flag.",
    "These symptoms require urgent cardiac evaluation.",
    "Consider ECG and cardiac enzymes to rule out acute coronary syndrome.",
  ],
  diabetes: [
    "The classic triad of polydipsia, polyuria, and weight loss suggests diabetes.",
    "Blood glucose and HbA1c tests would be helpful in this case.",
    "Type 2 diabetes often presents with these insidious symptoms.",
  ],
};

const getKeywordResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('thyroid') || lowerMessage.includes('hypothyroid') || lowerMessage.includes('fatigue') && lowerMessage.includes('weight')) {
    return responses.thyroid[Math.floor(Math.random() * responses.thyroid.length)];
  }
  if (lowerMessage.includes('heart') || lowerMessage.includes('chest pain') || lowerMessage.includes('cardiac')) {
    return responses.heart[Math.floor(Math.random() * responses.heart.length)];
  }
  if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar') || lowerMessage.includes('thirst')) {
    return responses.diabetes[Math.floor(Math.random() * responses.diabetes.length)];
  }
  if (lowerMessage.includes('symptom')) {
    return responses.symptoms[Math.floor(Math.random() * responses.symptoms.length)];
  }
  if (lowerMessage.includes('treatment') || lowerMessage.includes('medication') || lowerMessage.includes('therapy')) {
    return responses.treatment[Math.floor(Math.random() * responses.treatment.length)];
  }
  
  return responses.general[Math.floor(Math.random() * responses.general.length)];
};

const getRandomResponse = () => {
  const allResponses = [
    ...responses.symptoms,
    ...responses.general,
  ];
  return allResponses[Math.floor(Math.random() * allResponses.length)];
};

const getCaseContext = () => {
  const randomCase = cases[Math.floor(Math.random() * cases.length)];
  return {
    symptomContext: randomCase.symptoms.slice(0, 3),
    possibleConditions: ['Metabolic disorder', 'Endocrine dysfunction', 'Systemic illness'],
  };
};

exports.handleChat = async (req, res) => {
  try {
    const { caseId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const context = getCaseContext();
    const response = getKeywordResponse(message) || getRandomResponse();

    res.json({
      success: true,
      message,
      response,
      context,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};
