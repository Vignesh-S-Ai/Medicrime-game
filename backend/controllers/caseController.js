const supabase = require('../config/supabaseClient');

exports.getNewCase = async (req, res) => {
  try {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('id, name, age, symptoms');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch cases from database' });
    }

    if (!cases || cases.length === 0) {
      return res.status(404).json({ error: 'No cases found' });
    }

    const randomIndex = Math.floor(Math.random() * cases.length);
    const row = cases[randomIndex];

    res.json({
      id: row.id,
      patient: {
        name: row.name,
        age: row.age,
        gender: 'Not specified',
        occupation: 'Not specified',
      },
      symptoms: row.symptoms || [],
      chiefComplaint: 'Please consult with the patient',
      medicalHistory: 'No information available',
      vitalSigns: {
        heartRate: 'N/A',
        bloodPressure: 'N/A',
        temperature: 'N/A',
        weight: 'N/A',
      },
    });
  } catch (error) {
    console.error('Error fetching case:', error);
    res.status(500).json({ error: 'Failed to load case' });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: caseData, error } = await supabase
      .from('cases')
      .select('id, name, age, symptoms')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch case from database' });
    }

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.json({
      id: caseData.id,
      patient: {
        name: caseData.name,
        age: caseData.age,
        gender: 'Not specified',
        occupation: 'Not specified',
      },
      symptoms: caseData.symptoms || [],
      chiefComplaint: 'Please consult with the patient',
      medicalHistory: 'No information available',
      vitalSigns: {
        heartRate: 'N/A',
        bloodPressure: 'N/A',
        temperature: 'N/A',
        weight: 'N/A',
      },
    });
  } catch (error) {
    console.error('Error fetching case:', error);
    res.status(500).json({ error: 'Failed to load case' });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('id, name, age, symptoms');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch cases from database' });
    }

    res.json({
      success: true,
      cases: cases,
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ error: 'Failed to load cases' });
  }
};
