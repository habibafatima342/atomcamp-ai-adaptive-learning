import { useState } from "react";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";

export function PlacementTest({ onTestComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const placementQuestions = [
    {
      id: 1,
      category: "Programming",
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "5"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      id: 2,
      category: "Programming",
      question: "Which keyword is used to create a function in Python?",
      options: ["function", "def", "define", "func"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      id: 3,
      category: "Database",
      question: "Which clause is used to filter records in SQL?",
      options: ["FILTER", "WHERE", "FIND", "SEARCH"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      id: 4,
      category: "Database",
      question: "What does JOIN do in SQL?",
      options: [
        "Combines columns",
        "Combines rows from different tables",
        "Deletes data",
        "Updates data",
      ],
      correct: 1,
      difficulty: "Medium",
    },
    {
      id: 5,
      category: "Analytics",
      question: "What is the mean of 2, 4, 6, 8?",
      options: ["4", "5", "6", "5"],
      correct: 3,
      difficulty: "Medium",
    },
    {
      id: 6,
      category: "ML",
      question: "What is overfitting in machine learning?",
      options: [
        "Model is too simple",
        "Model learns noise in training data",
        "Model has too few features",
        "Model is underfitting",
      ],
      correct: 1,
      difficulty: "Hard",
    },
  ];

  const handleAnswer = (optionIndex) => {
    const isCorrect =
      optionIndex === placementQuestions[currentQuestion].correct;

    setAnswers([
      ...answers,
      {
        questionId: placementQuestions[currentQuestion].id,
        category: placementQuestions[currentQuestion].category,
        selected: optionIndex,
        correct: placementQuestions[currentQuestion].correct,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < placementQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const percentage = Math.round((score / placementQuestions.length) * 100);

  const getLevel = () => {
    if (percentage >= 80) return "Advanced";
    if (percentage >= 60) return "Intermediate";
    return "Beginner";
  };

  const getCategoryScores = () => {
    const categories = ["Programming", "Database", "Analytics", "ML"];
    const scores = {};

    categories.forEach((cat) => {
      const catAnswers = answers.filter((a) => a.category === cat);
      const correct = catAnswers.filter((a) => a.isCorrect).length;
      scores[cat] = catAnswers.length > 0 ? Math.round((correct / catAnswers.length) * 100) : 0;
    });

    return scores;
  };

  const categoryScores = getCategoryScores();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">
        {!showResults ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                📋 Placement Assessment
              </h2>
              <p className="text-slate-400">
                Let's determine your skill level and personalize your learning
                path
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-slate-400">
                  Question {currentQuestion + 1} of {placementQuestions.length}
                </p>
                <p className="text-sm font-semibold text-cyan-400">
                  {Math.round(
                    ((currentQuestion + 1) / placementQuestions.length) * 100
                  )}%
                </p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / placementQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
                  {placementQuestions[currentQuestion].difficulty}
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">
                  {placementQuestions[currentQuestion].category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-6">
                {placementQuestions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {placementQuestions[currentQuestion].options.map(
                  (option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full p-4 text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-xl transition text-white font-semibold"
                    >
                      {String.fromCharCode(65 + idx)}) {option}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-block bg-cyan-500/20 p-6 rounded-2xl border border-cyan-500/30 mb-6">
                  <p className="text-6xl font-bold text-cyan-400">
                    {percentage}%
                  </p>
                  <p className="text-slate-400 mt-2">Overall Score</p>
                </div>

                <h2 className="text-3xl font-bold mb-2">
                  Your Level: <span className="text-cyan-400">{getLevel()}</span>
                </h2>
                <p className="text-slate-400 mb-8">
                  {percentage >= 80
                    ? "Excellent! You're ready for advanced topics."
                    : percentage >= 60
                    ? "Good foundation! Ready for intermediate challenges."
                    : "Let's build strong fundamentals first."}
                </p>
              </div>

              {/* Category Breakdown */}
              <div className="mb-8 text-left">
                <h3 className="text-lg font-bold mb-4">Category Performance</h3>
                <div className="space-y-3">
                  {Object.entries(categoryScores).map(([category, score]) => (
                    <div key={category} className="bg-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{category}</p>
                        <p className={`font-bold ${
                          score >= 75
                            ? "text-green-400"
                            : score >= 50
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}>
                          {score}%
                        </p>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            score >= 75
                              ? "bg-green-500"
                              : score >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Personalized Recommendations
                </h3>
                <ul className="space-y-2 text-slate-300">
                  {Object.entries(categoryScores).map(([category, score]) => (
                    <li key={category} className="flex items-start gap-2">
                      {score >= 75 ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span>
                        {score >= 75
                          ? `Strong in ${category}! Ready for advanced ${category} concepts.`
                          : `Focus on ${category} fundamentals before advancing.`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  onTestComplete({
                    score: percentage,
                    level: getLevel(),
                    categoryScores,
                  })
                }
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition text-lg"
              >
                Generate My Learning Path
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
