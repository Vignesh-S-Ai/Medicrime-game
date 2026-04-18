require('dotenv').config();
const express = require('express');
const cors = require('cors');
const caseRoutes = require('./routes/caseRoutes');
const chatRoutes = require('./routes/chatRoutes');
const predictRoutes = require('./routes/predictRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/case', caseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/result', resultRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MedCrime AI API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MedCrime AI Backend running on port ${PORT}`);
});

module.exports = app;
