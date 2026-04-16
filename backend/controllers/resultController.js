const supabase = require('../config/supabaseClient');

exports.saveResult = async (req, res) => {
  try {
    const { caseId, userDiagnosis, correct } = req.body;

    if (!caseId || !userDiagnosis || correct === undefined) {
      return res.status(400).json({ error: 'Missing required fields: caseId, userDiagnosis, correct' });
    }

    const { data, error } = await supabase
      .from('results')
      .insert([
        {
          case_id: caseId,
          user_diagnosis: userDiagnosis,
          correct: correct,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save result' });
    }

    res.status(201).json({
      success: true,
      result: data,
    });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { data: results, error } = await supabase
      .from('results')
      .select(`
        *,
        cases (
          id,
          name,
          correct_diagnosis
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch results' });
    }

    res.json({
      success: true,
      results: results,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};
