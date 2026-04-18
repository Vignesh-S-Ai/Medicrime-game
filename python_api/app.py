from flask import Flask, request, jsonify

app = Flask(__name__)

disease_rules = {
    "Heart Attack": {
        "required": ["chest pain", "sweating"],
        "weight": 2,
        "optional": ["nausea", "shortness of breath", "dizziness", "pain radiating"],
    },
    "Flu": {
        "required": ["fever"],
        "weight": 1,
        "optional": ["cough", "body ache", "headache", "fatigue", "sore throat"],
    },
    "Hypothyroidism": {
        "required": ["fatigue", "weight gain"],
        "weight": 2,
        "optional": [
            "cold intolerance",
            "constipation",
            "dry skin",
            "hair loss",
            "depression",
        ],
    },
    "Type 2 Diabetes": {
        "required": ["excessive thirst", "frequent urination"],
        "weight": 2,
        "optional": ["weight loss", "fatigue", "blurred vision", "slow healing"],
    },
    "Alzheimer's Disease": {
        "required": ["memory loss", "confusion"],
        "weight": 2,
        "optional": [
            "difficulty with familiar tasks",
            "mood swings",
            "personality changes",
        ],
    },
    "Hyperthyroidism": {
        "required": ["anxiety", "weight loss"],
        "weight": 2,
        "optional": ["headache", "palpitations", "tremors", "sweating", "insomnia"],
    },
    "Pneumonia": {
        "required": ["fever", "cough"],
        "weight": 2,
        "optional": ["chest pain", "shortness of breath", "fatigue", "sweating"],
    },
    "Gastroenteritis": {
        "required": ["nausea", "vomiting"],
        "weight": 2,
        "optional": ["diarrhea", "fever", "headache", "stomach pain"],
    },
    "Migraine": {
        "required": ["headache"],
        "weight": 1,
        "optional": ["nausea", "sensitivity to light", "dizziness", "blurred vision"],
    },
    "Depression": {
        "required": ["fatigue"],
        "weight": 1,
        "optional": [
            "weight loss",
            "insomnia",
            "loss of interest",
            "sadness",
            "anxiety",
        ],
    },
}


def normalize_symptom(symptom):
    return symptom.lower().strip()


def calculate_disease_score(symptoms):
    scores = {}

    for disease, rules in disease_rules.items():
        score = 0
        matched_symptoms = []

        for symptom in symptoms:
            norm_symptom = normalize_symptom(symptom)

            if norm_symptom in rules["required"]:
                score += rules["weight"] * 2
                matched_symptoms.append(norm_symptom)
            elif norm_symptom in rules["optional"]:
                score += rules["weight"]
                matched_symptoms.append(norm_symptom)

        if score > 0:
            required_match = sum(
                1
                for r in rules["required"]
                if r in [normalize_symptom(s) for s in symptoms]
            )
            required_ratio = required_match / len(rules["required"])

            if required_ratio >= 0.5:
                scores[disease] = {
                    "score": score,
                    "matched_symptoms": matched_symptoms,
                    "required_match_ratio": required_ratio,
                }

    return scores


def predict_disease(symptoms):
    if not symptoms:
        return {
            "prediction": "Unknown",
            "confidence": 0.0,
            "reason": "No symptoms provided",
        }

    scores = calculate_disease_score(symptoms)

    if not scores:
        return {
            "prediction": "Unknown",
            "confidence": 0.3,
            "reason": "No matching disease patterns found",
        }

    best_disease = max(scores.items(), key=lambda x: x[1]["score"])
    disease_name = best_disease[0]
    disease_data = best_disease[1]

    base_confidence = min(disease_data["score"] / 10, 0.95)
    required_bonus = disease_data["required_match_ratio"] * 0.1
    confidence = min(base_confidence + required_bonus, 0.99)

    return {
        "prediction": disease_name,
        "confidence": round(confidence, 2),
        "matched_symptoms": disease_data["matched_symptoms"],
    }


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "symptoms" not in data:
            return jsonify({"error": "Missing symptoms field"}), 400

        symptoms = data["symptoms"]

        if not isinstance(symptoms, list):
            return jsonify({"error": "Symptoms must be a list"}), 400

        result = predict_disease(symptoms)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "MedCrime AI Python API is running"})


@app.route("/", methods=["GET"])
def index():
    return jsonify(
        {
            "name": "MedCrime AI - Disease Prediction API",
            "version": "1.0.0",
            "endpoints": {
                "POST /predict": "Predict disease from symptoms",
                "GET /health": "Health check",
            },
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
