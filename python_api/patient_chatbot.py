from flask import Flask, request, jsonify

app = Flask(__name__)

patient_responses = {
    "smoke": "Yes, occasionally. About half a pack per day for the past 15 years.",
    "alcohol": "I have a glass of wine with dinner occasionally.",
    "exercise": "Not really, my job keeps me quite sedentary.",
    "medication": "I take medication for blood pressure, but nothing else regularly.",
    "allergy": "I'm allergic to penicillin.",
    "family": "My father had heart disease, and my mother has diabetes.",
    "pain": "It hurts a lot in my chest, especially when I breathe deeply.",
    "symptom": "The pain started about an hour ago and hasn't stopped.",
    "duration": "The symptoms have been getting worse over the past few days.",
    "severity": "It's quite severe, I'd rate it about 8 out of 10.",
}

default_responses = [
    "I'm not sure. Could you explain that in more detail?",
    "I don't really know. Should I be concerned?",
    "I'm not sure what you mean. Can you ask differently?",
    "I don't have enough information to answer that properly.",
]


def get_patient_response(question):
    question_lower = question.lower()

    for keyword, response in patient_responses.items():
        if keyword in question_lower:
            return response

    import random

    return random.choice(default_responses)


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        if not data or "question" not in data:
            return jsonify({"error": "Missing question field"}), 400

        question = data["question"]

        if not isinstance(question, str):
            return jsonify({"error": "Question must be a string"}), 400

        response = get_patient_response(question)

        return jsonify({"response": response, "original_question": question})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Patient Chatbot API is running"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=True)
