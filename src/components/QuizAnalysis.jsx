import { TrendingUp, Award, AlertCircle, Target } from "lucide-react";

export function QuizAnalysis({ studentName }) {
  const quizHistory = [
    {
      id: 1,
      quizName: "Python Basics",
      category: "Programming",
      score: 85,
      date: "2024-01-15",
      questions: 3,
      correct: 3,
    },
    {
      id: 2,
      quizName: "SQL Fundamentals",
      category: "Database",
      score: 62,
      date: "2024-01-14",
      questions: 3,
      correct: 2,
    },
    {
      id: 3,
      quizName: "Data Analytics",
      category: "Analytics",
      score: 75,
      date: "2024-01-13",
      questions: 3,
      correct: 2,
    },
    {
      id: 4,
      quizName: "Machine Learning",
      category: "AI/ML",
      score: 55,
      date: "2024-01-12",
      questions: 3,
      correct: 2,
    },
  ];

  const categoryStats = {
    Programming: { avg: 85, trend: "up", status: "Strong" },
    Database: { avg: 62, trend: "down", status: "Needs Work" },
    Analytics: { avg: 75, trend: "up", status: "Good" },
    "AI/ML": { avg: 55, trend: "down", status: "Needs Work" },
  };

  const overallStats = {
    totalQuizzes: quizHistory.length,
    averageScore: Math.round(
      quizHistory.reduce((sum, q) => sum + q.score, 0) / quizHistory.length
    ),
    strongestArea: "Programming",
    weakestArea: "AI/ML",
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-blue-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusBg = (status) => {
    if (status === "Strong") return "bg-green-900 text-green-300";
    if (status === "Good") return "bg-blue-900 text-blue-300";
    return "bg-yellow-900 text-yellow-300";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quiz Analysis</h2>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Average Score"
          value={`${overallStats.averageScore}%`}
          color="cyan"
        />
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Quizzes Taken"
          value={overallStats.totalQuizzes}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Strongest Area"
          value={overallStats.strongestArea}
          color="green"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Needs Focus"
          value={overallStats.weakestArea}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Performance */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold mb-4">Category Performance</h3>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                <div className="flex-1">
                  <p className="font-medium">{category}</p>
                  <p className="text-sm text-slate-400">
                    Average: {stats.avg}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        stats.avg >= 80
                          ? "bg-green-500"
                          : stats.avg >= 60
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                      style={{ width: `${stats.avg}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${getStatusBg(stats.status)} px-2 py-1 rounded`}>
                    {stats.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl p-6 border border-cyan-700">
          <h3 className="text-lg font-bold mb-4">Learning Insights</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-cyan-300 mb-1">Focus Area</p>
              <p className="font-bold">Machine Learning Fundamentals</p>
              <p className="text-xs text-cyan-400 mt-1">Current score: 55%</p>
            </div>
            <div>
              <p className="text-sm text-cyan-300 mb-1">Strengths</p>
              <p className="font-bold">Python Programming</p>
              <p className="text-xs text-cyan-400 mt-1">Consistent high scores</p>
            </div>
            <div>
              <p className="text-sm text-cyan-300 mb-1">Study Time</p>
              <p className="font-bold">~20 minutes</p>
              <p className="text-xs text-cyan-400 mt-1">Per quiz average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Quiz Results */}
      <div className="mt-6 bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold mb-4">Recent Quiz Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-3">Quiz Name</th>
                <th className="text-left py-3 px-3">Category</th>
                <th className="text-left py-3 px-3">Score</th>
                <th className="text-left py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {quizHistory.map((quiz) => (
                <tr key={quiz.id} className="border-b border-slate-800 hover:bg-slate-800 transition">
                  <td className="py-3 px-3 font-medium">{quiz.quizName}</td>
                  <td className="py-3 px-3 text-slate-400">{quiz.category}</td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${getScoreColor(quiz.score)}`}>
                      {quiz.score}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{quiz.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    cyan: "bg-cyan-900 border-cyan-700 text-cyan-400",
    blue: "bg-blue-900 border-blue-700 text-blue-400",
    green: "bg-green-900 border-green-700 text-green-400",
    red: "bg-red-900 border-red-700 text-red-400",
  };

  return (
    <div className={`rounded-2xl p-4 border ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wide opacity-75">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
