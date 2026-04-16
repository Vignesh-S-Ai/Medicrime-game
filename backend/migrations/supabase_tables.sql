-- Create cases table
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  symptoms TEXT[] NOT NULL,
  correct_diagnosis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create results table
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id),
  user_diagnosis TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Public read access for cases
CREATE POLICY "Public read cases" ON cases FOR SELECT USING (true);

-- Public insert for results
CREATE POLICY "Public insert results" ON results FOR INSERT WITH CHECK (true);

-- Public read for results
CREATE POLICY "Public read results" ON results FOR SELECT USING (true);

-- Sample data for cases
INSERT INTO cases (name, age, symptoms, correct_diagnosis) VALUES
  ('Sarah Johnson', 34, ARRAY['Fatigue', 'Weight gain', 'Cold intolerance', 'Constipation', 'Dry skin', 'Hair loss', 'Depression'], 'Hypothyroidism'),
  ('Michael Chen', 52, ARRAY['Chest pain', 'Shortness of breath', 'Sweating', 'Nausea', 'Dizziness', 'Pain radiating to left arm'], 'Heart Attack'),
  ('Emily Davis', 28, ARRAY['Excessive thirst', 'Frequent urination', 'Weight loss', 'Fatigue', 'Blurred vision', 'Slow healing wounds'], 'Type 2 Diabetes'),
  ('Robert Williams', 65, ARRAY['Memory loss', 'Confusion', 'Difficulty with familiar tasks', 'Mood swings', 'Personality changes', 'Getting lost in familiar places'], 'Alzheimer''s Disease'),
  ('Jessica Martinez', 32, ARRAY['Headaches', 'Anxiety', 'Palpitations', 'Tremors', 'Sweating', 'Insomnia', 'Weight loss'], 'Hyperthyroidism');
