import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Brain, Zap } from "lucide-react";

export function QuizManager({ studentName, onBack }) {
  const [currentPage, setCurrentPage] = useState("selection"); // selection, quiz, results
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResults, setQuizResults] = useState(null);

  const quizzes = [
    {
      id: 1,
      category: "Python Basics",
      categoryType: "Programming",
      questions: [
        {
          id: 1,
          question: "What is the output of print(2 ** 3)?",
          options: ["6", "8", "9", "5"],
          correct: 1,
        },
        {
          id: 2,
          question: "Which keyword is used to create a function?",
          options: ["function", "def", "define", "func"],
          correct: 1,
        },
        {
          id: 3,
          question: "What is the correct way to create a list?",
          options: ["list = ()", "list = []", "list = {}", "list = <>"],
          correct: 1,
        },
      ],
    },
    {
      id: 2,
      category: "SQL Fundamentals",
      categoryType: "Database",
      questions: [
        {
          id: 1,
          question: "Which clause is used to filter records?",
          options: ["FILTER", "WHERE", "FIND", "SEARCH"],
          correct: 1,
        },
        {
          id: 2,
          question: "What does JOIN do?",
          options: [
            "Combines columns",
            "Combines rows",
            "Deletes data",
            "Updates data",
          ],
          correct: 0,
        },
        {
          id: 3,
          question: "Which is the correct SELECT syntax?",
          options: [
            "SELECT * FROM table",
            "FROM table SELECT *",
            "GET * FROM table",
            "FIND * IN table",
          ],
          correct: 0,
        },
      ],
    },
    {
      id: 3,
      category: "Data Analytics",
      categoryType: "Analytics",
      questions: [
        {
          id: 1,
          question: "What is the mean of 2, 4, 6, 8?",
          options: ["4", "5", "6", "5"],
          correct: 3,
        },
        {
          id: 2,
          question: "Which visualization best shows distribution?",
          options: ["Pie Chart", "Histogram", "Line Chart", "Bar Chart"],
          correct: 1,
        },
        {
          id: 3,
          question: "What does correlation measure?",
          options: [
            "Central tendency",
            "Relationship between variables",
            "Spread of data",
            "Mode",
          ],
          correct: 1,
        },
      ],
    },
    {
      id: 4,
      category: "Machine Learning",
      categoryType: "AI/ML",
      questions: [
        {
          id: 1,
          question: "What is overfitting?",
          options: [
            "Model is too simple",
            "Model learns noise in training data",
            "Model has too few features",
            "Model is underfitting",
          ],
          correct: 1,
        },
        {
          id: 2,
          question: "Which algorithm is unsupervised?",
          options: ["Linear Regression", "K-Means", "Logistic Regression", "SVM"],
          correct: 1,
        },
        {
          id: 3,
          question: "What is the purpose of cross-validation?",
          options: [
            "Reduce overfitting",
            "Validate model on multiple data splits",
            "Improve speed",
            "Reduce memory",
          ],
          correct: 1,
        },
      ],
    },
  ];

  const categoryIcons = {
    Programming: "🐍",
    Database: "🗄️",
    Analytics: "📊",
    "AI/ML": "🤖",
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setCurrentPage("quiz");
  };

  const handleAnswer = (optionIndex) => {
    const isCorrect =
      optionIndex === selectedQuiz.questions[currentQuestion].correct;
    const newAnswers = [
      ...answers,
      {
        questionId: selectedQuiz.questions[currentQuestion].id,
        selected: optionIndex,
        correct: selectedQuiz.questions[currentQuestion].correct,
        isCorrect,
      },
    ];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz finished
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round(
        (finalScore / selectedQuiz.questions.length) * 100
      );

      setQuizResults({
        quizName: selectedQuiz.category,
        category: selectedQuiz.categoryType,
        totalQuestions: selectedQuiz.questions.length,
        correctAnswers: finalScore,
        percentage,
        answers: newAnswers,
        timestamp: new Date().toLocaleDateString(),
      });

      setCurrentPage("results");
    }
  };

  const handleRetakeQuiz = () => {
    handleStartQuiz(selectedQuiz);
  };

  const handleBackToSelection = () => {
    setCurrentPage("selection");
    setSelectedQuiz(null);
    setQuizResults(null);
  };

  if (currentPage === "selection") {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">Quiz Center</h2>
            <p className="text-slate-400">Take quizzes and track your progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500 transition cursor-pointer"
              onClick={() => handleStartQuiz(quiz)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl mb-2">
                    {categoryIcons[quiz.categoryType]}
                  </div>
                  <h3 className="text-xl font-bold">{quiz.category}</h3>
                  <p className="text-sm text-slate-400">{quiz.categoryType}</p>
                </div>
                <div className="text-right text-slate-400">
                  <p className="text-sm">{quiz.questions.length} Questions</p>
                  <p className="text-xs">~5 minutes</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl transition font-medium">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentPage === "quiz" && selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{selectedQuiz.category}</h2>
            <p className="text-slate-400">
              Question {currentQuestion + 1} of {selectedQuiz.questions.length}
            </p>
          </div>
          <button
            onClick={handleBackToSelection}
            className="p-2 hover:bg-slate-800 rounded-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
          <div
            className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 mb-6">
          <h3 className="text-lg font-bold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-xl border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600" />
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "results" && quizResults) {
    const getPerformanceLevel = (percentage) => {
      if (percentage >= 80) return { level: "Excellent", color: "text-green-400" };
      if (percentage >= 60) return { level: "Good", color: "text-blue-400" };
      if (percentage >= 40) return { level: "Fair", color: "text-yellow-400" };
      return { level: "Needs Improvement", color: "text-red-400" };
    };

    const performance = getPerformanceLevel(quizResults.percentage);
    const recommendation = getQuizRecommendation(quizResults);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handleBackToSelection}
            className="p-2 hover:bg-slate-800 rounded-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Quiz Results</h2>
        </div>

        {/* Score Circle */}
        <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 mb-6 text-center">
          <div className="w-40 h-40 mx-auto rounded-full border-8 border-cyan-500 flex items-center justify-center mb-6">
            <div>
              <div className={`text-5xl font-bold ${performance.color}`}>
                {quizResults.percentage}%
              </div>
              <p className={`text-sm ${performance.color} mt-1`}>
                {performance.level}
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">{quizResults.quizName}</h3>
          <p className="text-slate-400">
            You scored {quizResults.correctAnswers} out of{" "}
            {quizResults.totalQuestions} questions
          </p>
        </div>

        {/* Answer Breakdown */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">
          <h3 className="text-lg font-bold mb-4">Answer Breakdown</h3>
          <div className="space-y-3">
            {quizResults.answers.map((answer, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0">
                <div>
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">Question {idx + 1}</p>
                  <p className="text-slate-400 text-sm">
                    {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-2xl p-6 border border-cyan-700 mb-6">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-cyan-300 mb-2">Recommendation</h4>
              <p className="text-sm">{recommendation}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleRetakeQuiz}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl transition font-medium"
          >
            Retake Quiz
          </button>
          <button
            onClick={handleBackToSelection}
            className="flex-1 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl transition font-medium"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function getQuizRecommendation(results) {
  const { percentage, category, quizName } = results;

  if (percentage >= 80) {
    return `Excellent work on ${quizName}! You have a strong grasp of ${category} concepts. Consider moving to advanced topics or helping peers with these concepts.`;
  } else if (percentage >= 60) {
    return `Good job on ${quizName}! You're on the right track with ${category}. Review the questions you missed and practice more examples to solidify your understanding.`;
  } else if (percentage >= 40) {
    return `You got ${percentage}% on ${quizName}. I recommend reviewing the core ${category} concepts. Try our revision modules and practice questions before retaking this quiz.`;
  } else {
    return `You scored ${percentage}% on ${quizName}. This area needs focus. I recommend: 1) Review fundamental ${category} concepts, 2) Work with a mentor, 3) Complete guided practice, 4) Retake this quiz.`;
  }
}
