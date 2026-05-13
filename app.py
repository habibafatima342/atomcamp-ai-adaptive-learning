from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import json
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None


def load_courses():
    courses_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "courses.json"
    )

    with open(courses_path, "r") as file:
        return json.load(file)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Atom-Adaptive Backend is running successfully!"
    })


@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(load_courses())


@app.route("/roadmap", methods=["POST"])
def generate_roadmap():
    if model is None:
        return jsonify({"error": "Gemini API key not configured"}), 503

    data = request.json or {}

    goal = data.get("goal", "Become a Data Scientist")
    level = data.get("level", "Beginner")
    hours = data.get("hours", "10")

    prompt = f"""
You are Atomcamp Mentor AI.

Create a personalized learning roadmap for this student.

Student Goal: {goal}
Current Level: {level}
Study Hours Per Week: {hours}

Available Atomcamp Courses:
{load_courses()}

Return:
1. Recommended course order
2. Weekly learning plan
3. Skills to focus on
4. Final project idea
5. Short motivation line
"""

    response = model.generate_content(prompt)

    return jsonify({
        "roadmap": response.text
    })


@app.route("/tutor", methods=["POST"])
def ai_tutor():
    if model is None:
        return jsonify({"error": "Gemini API key not configured"}), 503

    data = request.json or {}
    question = data.get("question", "")

    prompt = f"""
You are an AI tutor for Atomcamp students.

Use this Atomcamp course data:
{load_courses()}

Student Question:
{question}

Give:
1. Simple explanation
2. Example
3. Recommended course
"""

    response = model.generate_content(prompt)

    return jsonify({
        "answer": response.text
    })


@app.route("/analyze-struggles", methods=["POST"])
def analyze_struggles():
    if model is None:
        return jsonify({"error": "Gemini API key not configured"}), 503

    data = request.json or {}

    questions = data.get("questions", [
        "I do not understand Python loops",
        "What is machine learning model training?",
        "I am confused about data cleaning",
        "How do functions work in Python?"
    ])

    prompt = f"""
You are an instructor analytics assistant.

Analyze these student questions:
{questions}

Return:
1. Top confusion topics
2. Weak areas
3. At-risk students
4. Suggested instructor actions
"""

    response = model.generate_content(prompt)

    return jsonify({
        "analysis": response.text
    })


@app.route("/mock-dashboard", methods=["GET"])
def mock_dashboard():
    return jsonify({
        "total_students": 45,
        "active_students": 32,
        "at_risk_students": 7,
        "completion_rate": "71%",
        "top_confusion_topics": [
            "Python Loops",
            "Machine Learning Models",
            "Data Cleaning"
        ],
        "struggling_students": [
            {
                "name": "Ali",
                "weak_area": "Python Functions",
                "risk": "High"
            },
            {
                "name": "Sara",
                "weak_area": "Pandas",
                "risk": "Medium"
            },
            {
                "name": "Ahmed",
                "weak_area": "ML Concepts",
                "risk": "High"
            }
        ]
    })


@app.route("/test-roadmap", methods=["GET"])
def test_roadmap():
    if model is None:
        return jsonify({"error": "Gemini API key not configured"}), 503

    response = model.generate_content(
        "Create a short roadmap to become a Data Scientist."
    )

    return jsonify({
        "roadmap": response.text
    })


if __name__ == "__main__":
    app.run(debug=True)