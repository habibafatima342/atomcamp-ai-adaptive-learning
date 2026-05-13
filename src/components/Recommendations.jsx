import { Lightbulb, BookOpen, Users, Zap, CheckCircle, AlertTriangle } from "lucide-react";

export function Recommendations({ studentProfile }) {
  const recommendations = [
    {
      id: 1,
      type: "revision",
      priority: "high",
      title: "SQL Joins Revision Needed",
      description:
        "Your recent SQL Fundamentals quiz shows 62% - focus on JOIN operations",
      action: "Start Revision Module",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "bg-red-900 border-red-700 text-red-300",
      categoryColor: "from-red-900 to-red-800",
    },
    {
      id: 2,
      type: "advance",
      priority: "high",
      title: "Advance to Python Advanced",
      description:
        "You scored 85% on Python Basics - ready for intermediate concepts",
      action: "Unlock Advanced Module",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-green-900 border-green-700 text-green-300",
      categoryColor: "from-green-900 to-green-800",
    },
    {
      id: 3,
      type: "mentor",
      priority: "medium",
      title: "Schedule Mentor Session",
      description:
        "1-on-1 guidance on Machine Learning fundamentals (55% score)",
      action: "Book Session",
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-900 border-blue-700 text-blue-300",
      categoryColor: "from-blue-900 to-blue-800",
    },
    {
      id: 4,
      type: "practice",
      priority: "medium",
      title: "Additional Practice",
      description:
        "Complete 5 practice problems on Data Analytics concepts",
      action: "Start Practice",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-purple-900 border-purple-700 text-purple-300",
      categoryColor: "from-purple-900 to-purple-800",
    },
  ];

  const learningPath = [
    {
      status: "completed",
      title: "Python Basics",
      description: "85% - Strong foundation",
    },
    {
      status: "in-progress",
      title: "SQL Fundamentals",
      description: "62% - Needs revision on JOINs",
    },
    {
      status: "blocked",
      title: "Data Analytics",
      description: "Available after SQL improvement",
    },
    {
      status: "locked",
      title: "Machine Learning",
      description: "Unlock after Analytics",
    },
  ];

  const categoryInstructions = [
    {
      category: "Programming",
      instructor: "Dr. Ahmed Hassan",
      specialty: "Python & Advanced Algorithms",
      rating: 4.8,
      students: 120,
      message:
        "Great progress on Python! Your loops and function understanding is solid. Next: work on decorators.",
    },
    {
      category: "Database",
      instructor: "Sarah Williams",
      specialty: "SQL & Database Design",
      rating: 4.7,
      students: 95,
      message:
        "Your SQL joins need more practice. Let's schedule a 30-min session to clarify LEFT/RIGHT/INNER joins.",
    },
    {
      category: "Analytics",
      instructor: "Prof. Raj Patel",
      specialty: "Data Analytics & Visualization",
      rating: 4.9,
      students: 110,
      message:
        "Good start! Your statistical understanding is developing. Focus on real-world datasets next.",
    },
    {
      category: "AI/ML",
      instructor: "Dr. Lisa Chen",
      specialty: "Machine Learning & Deep Learning",
      rating: 4.6,
      students: 85,
      message:
        "Your fundamentals need strengthening. Complete the Prerequisites module before advanced ML topics.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personalized Recommendations</h2>

      {/* Quick Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`rounded-2xl p-5 border ${rec.color} bg-slate-900 hover:shadow-lg transition`}
          >
            <div className="flex items-start gap-3 mb-3">
              {rec.icon}
              <div className="flex-1">
                <p className="text-xs uppercase font-bold opacity-75">
                  {rec.type === "revision"
                    ? "Revision Needed"
                    : rec.type === "advance"
                    ? "Ready to Advance"
                    : rec.type === "mentor"
                    ? "Mentoring"
                    : "Practice"}
                </p>
                <h3 className="font-bold mt-1">{rec.title}</h3>
              </div>
              <span className="px-2 py-1 bg-slate-800 text-xs rounded-full">
                {rec.priority === "high" ? "🔴" : "🟡"} {rec.priority}
              </span>
            </div>
            <p className="text-sm text-slate-300 mb-4">{rec.description}</p>
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded-lg transition font-medium text-sm">
              {rec.action}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Learning Path */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold mb-4">Learning Path</h3>
          <div className="space-y-3">
            {learningPath.map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`p-3 rounded-xl border-l-4 ${
                  item.status === "completed"
                    ? "bg-green-900 border-green-500"
                    : item.status === "in-progress"
                    ? "bg-blue-900 border-blue-500"
                    : item.status === "blocked"
                    ? "bg-yellow-900 border-yellow-500"
                    : "bg-slate-800 border-slate-600"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {item.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    <p className="font-medium text-sm">{item.title}</p>
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>
                </div>
                {idx < learningPath.length - 1 && (
                  <div className="h-2 w-0.5 bg-slate-700 ml-6 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Instructors */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">Your Category Instructors</h3>
          <div className="space-y-3">
            {categoryInstructions.map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 hover:border-cyan-500 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{cat.category}</p>
                    <h4 className="font-bold">{cat.instructor}</h4>
                    <p className="text-xs text-slate-400">{cat.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      ⭐ {cat.rating}
                    </div>
                    <p className="text-xs text-slate-400">{cat.students} students</p>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 mt-2">
                  <p className="text-sm text-slate-200">{cat.message}</p>
                </div>
                <button className="w-full mt-3 text-sm px-3 py-1 border border-cyan-500 text-cyan-400 hover:bg-cyan-900 rounded-lg transition">
                  Contact Instructor
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Plan */}
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-2xl p-6 border border-cyan-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">Suggested Weekly Study Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-cyan-200 font-medium">Monday & Wednesday</p>
                <p className="text-cyan-100 text-xs">SQL JOIN revision (2 hours)</p>
              </div>
              <div>
                <p className="text-cyan-200 font-medium">Tuesday & Thursday</p>
                <p className="text-cyan-100 text-xs">Python advanced concepts (1.5 hours)</p>
              </div>
              <div>
                <p className="text-cyan-200 font-medium">Saturday</p>
                <p className="text-cyan-100 text-xs">Data Analytics practice (2 hours)</p>
              </div>
              <div>
                <p className="text-cyan-200 font-medium">Sunday</p>
                <p className="text-cyan-100 text-xs">Weekly mentor session (1 hour)</p>
              </div>
            </div>
            <button className="mt-4 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg transition font-medium text-sm">
              Create Schedule in Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
