import { useState } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";

export function InstructorPortal() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all"); // all, high, medium, low

  const students = [
    {
      id: 1,
      name: "Ali",
      email: "ali@atomcamp.com",
      progress: 32,
      quizScore: 45,
      weakTopic: "Python Basics",
      lastActive: "2024-01-15",
      riskLevel: "High",
      status: "At Risk",
      enrolled: "2024-01-01",
      goal: "Become a Python Developer",
      courseProgress: {
        "Python Basics": 32,
        "Python Advanced": 0,
        "SQL": 0,
      },
      quizHistory: [
        { quiz: "Python Basics", score: 45, date: "2024-01-15" },
        { quiz: "Python Variables", score: 38, date: "2024-01-10" },
      ],
      mentorNotes:
        "Struggling with loop concepts. Needs one-on-one session.",
      communicationHistory: [
        {
          from: "Instructor",
          message: "Hi Ali, I noticed you scored 45% on Python Basics. Let's schedule a session.",
          date: "2024-01-15",
        },
        {
          from: "Ali",
          message: "Sure! I'm available tomorrow at 3 PM",
          date: "2024-01-15",
        },
      ],
    },
    {
      id: 2,
      name: "Sara",
      email: "sara@atomcamp.com",
      progress: 61,
      quizScore: 72,
      weakTopic: "SQL Joins",
      lastActive: "2024-01-16",
      riskLevel: "Medium",
      status: "On Track",
      enrolled: "2024-01-02",
      goal: "Become a Data Analyst",
      courseProgress: {
        "Python Basics": 85,
        "Python Advanced": 45,
        "SQL": 61,
      },
      quizHistory: [
        { quiz: "SQL Fundamentals", score: 72, date: "2024-01-16" },
        { quiz: "Python Advanced", score: 68, date: "2024-01-12" },
      ],
      mentorNotes: "Good progress overall. Focus on SQL JOIN operations.",
      communicationHistory: [
        {
          from: "Instructor",
          message: "Great work on the Python Advanced module!",
          date: "2024-01-12",
        },
      ],
    },
    {
      id: 3,
      name: "Ahmed",
      email: "ahmed@atomcamp.com",
      progress: 78,
      quizScore: 88,
      weakTopic: "ML Models",
      lastActive: "2024-01-16",
      riskLevel: "Low",
      status: "Excelling",
      enrolled: "2024-01-01",
      goal: "Become a Machine Learning Engineer",
      courseProgress: {
        "Python Basics": 95,
        "Python Advanced": 85,
        "SQL": 80,
      },
      quizHistory: [
        { quiz: "Python Advanced", score: 88, date: "2024-01-16" },
        { quiz: "SQL Fundamentals", score: 82, date: "2024-01-14" },
      ],
      mentorNotes: "Top performer. Ready for advanced ML topics.",
      communicationHistory: [
        {
          from: "Instructor",
          message: "Excellent work! Ready to move to ML Foundations?",
          date: "2024-01-16",
        },
      ],
    },
    {
      id: 4,
      name: "Mina",
      email: "mina@atomcamp.com",
      progress: 38,
      quizScore: 49,
      weakTopic: "Data Cleaning",
      lastActive: "2024-01-14",
      riskLevel: "High",
      status: "At Risk",
      enrolled: "2024-01-05",
      goal: "Become a Data Scientist",
      courseProgress: {
        "Python Basics": 55,
        "Python Advanced": 0,
        "SQL": 38,
      },
      quizHistory: [
        { quiz: "Python Basics", score: 49, date: "2024-01-14" },
        { quiz: "SQL Fundamentals", score: 40, date: "2024-01-12" },
      ],
      mentorNotes:
        "Fallen behind. Recommend revision modules and reduced course load.",
      communicationHistory: [],
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterRisk === "all" ||
      student.riskLevel.toLowerCase() === filterRisk.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalStudents: students.length,
    atRisk: students.filter((s) => s.riskLevel === "High").length,
    onTrack: students.filter((s) => s.riskLevel === "Low").length,
    averageProgress: Math.round(
      students.reduce((sum, s) => sum + s.progress, 0) / students.length
    ),
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Management Portal</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatBox label="Total Students" value={stats.totalStudents} color="cyan" />
        <StatBox label="At Risk" value={stats.atRisk} color="red" />
        <StatBox label="On Track" value={stats.onTrack} color="green" />
        <StatBox
          label="Avg Progress"
          value={`${stats.averageProgress}%`}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 border border-slate-800 h-[600px] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3">All Students</h3>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-sm outline-none mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilterRisk("all")}
                className={`text-xs px-2 py-1 rounded ${
                  filterRisk === "all"
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRisk("high")}
                className={`text-xs px-2 py-1 rounded ${
                  filterRisk === "high"
                    ? "bg-red-500 text-white"
                    : "bg-slate-800"
                }`}
              >
                High Risk
              </button>
              <button
                onClick={() => setFilterRisk("low")}
                className={`text-xs px-2 py-1 rounded ${
                  filterRisk === "low"
                    ? "bg-green-500 text-white"
                    : "bg-slate-800"
                }`}
              >
                Low Risk
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  selectedStudent?.id === student.id
                    ? "bg-cyan-600 text-slate-950 font-bold"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs opacity-75">{student.progress}% progress</p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      student.riskLevel === "High"
                        ? "bg-red-500"
                        : student.riskLevel === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Student Details */}
        <div className="lg:col-span-3">
          {selectedStudent ? (
            <StudentProfileDetail student={selectedStudent} />
          ) : (
            <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 h-[600px] flex items-center justify-center text-center">
              <div>
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Select a student to view detailed profile and manage their learning journey
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  const colorMap = {
    cyan: "bg-cyan-900 border-cyan-700 text-cyan-400",
    blue: "bg-blue-900 border-blue-700 text-blue-400",
    red: "bg-red-900 border-red-700 text-red-400",
    green: "bg-green-900 border-green-700 text-green-400",
  };

  return (
    <div className={`rounded-2xl p-4 border ${colorMap[color]}`}>
      <p className="text-xs uppercase opacity-75 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function StudentProfileDetail({ student }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, quizzes, communication, actions

  const getRiskColor = (risk) => {
    if (risk === "High") return "bg-red-900 text-red-300";
    if (risk === "Medium") return "bg-yellow-900 text-yellow-300";
    return "bg-green-900 text-green-300";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{student.name}</h3>
            <p className="text-slate-400 text-sm">{student.email}</p>
            <p className="text-slate-400 text-sm mt-1">Goal: {student.goal}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(student.riskLevel)}`}>
              {student.riskLevel} Risk
            </span>
            <p className="text-slate-400 text-xs mt-2">Last Active: {student.lastActive}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-slate-800 rounded-lg p-2">
            <p className="text-xs text-slate-400">Progress</p>
            <p className="text-lg font-bold">{student.progress}%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2">
            <p className="text-xs text-slate-400">Quiz Score</p>
            <p className="text-lg font-bold">{student.quizScore}%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2">
            <p className="text-xs text-slate-400">Weak Topic</p>
            <p className="text-xs font-bold truncate">{student.weakTopic}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2">
            <p className="text-xs text-slate-400">Status</p>
            <p className="text-xs font-bold">{student.status}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <div className="flex gap-3 mb-6 border-b border-slate-800 pb-4">
          {[
            { id: "overview", label: "Overview" },
            { id: "quizzes", label: "Quizzes" },
            { id: "communication", label: "Messages" },
            { id: "actions", label: "Actions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-cyan-600 text-slate-950"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-3">Course Progress</h4>
              <div className="space-y-2">
                {Object.entries(student.courseProgress).map(([course, progress]) => (
                  <div key={course}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{course}</span>
                      <span className="text-xs text-slate-400">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-cyan-500 h-2 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              <h4 className="font-bold mb-2 text-sm">Mentor Notes</h4>
              <p className="text-sm text-slate-300">{student.mentorNotes}</p>
            </div>

            <div>
              <h4 className="font-bold mb-2 text-sm">Enrolled</h4>
              <p className="text-sm text-slate-400">{student.enrolled}</p>
            </div>
          </div>
        )}

        {activeTab === "quizzes" && (
          <div className="space-y-2">
            <h4 className="font-bold mb-3">Recent Quiz Results</h4>
            {student.quizHistory.map((quiz, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{quiz.quiz}</p>
                  <p className="text-xs text-slate-400">{quiz.date}</p>
                </div>
                <div className={`text-lg font-bold ${
                  quiz.score >= 80 ? "text-green-400" : quiz.score >= 60 ? "text-blue-400" : "text-red-400"
                }`}>
                  {quiz.score}%
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "communication" && (
          <StudentMessaging student={student} />
        )}

        {activeTab === "actions" && (
          <StudentActions student={student} />
        )}
      </div>
    </div>
  );
}

function StudentMessaging({ student }) {
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg p-4 h-[200px] overflow-y-auto space-y-2">
        {student.communicationHistory.length > 0 ? (
          student.communicationHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${
                msg.from === "Instructor"
                  ? "bg-cyan-600 text-slate-950 ml-auto"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              <p className="text-xs opacity-75 mb-1">{msg.from}</p>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-50 mt-1">{msg.date}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm text-center py-6">No messages yet. Start a conversation!</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-sm outline-none"
        />
        <button className="bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded-lg transition font-medium text-sm">
          Send
        </button>
      </div>
    </div>
  );
}

function StudentActions({ student }) {
  const actions = [
    {
      id: 1,
      action: "Schedule Revision Session",
      description: "1-on-1 focus on weak topics",
      urgency: student.riskLevel === "High" ? "urgent" : "normal",
      icon: "📅",
    },
    {
      id: 2,
      action: "Send Resource Link",
      description: "Share practice materials",
      urgency: "normal",
      icon: "📚",
    },
    {
      id: 3,
      action: "Unlock Advanced Module",
      description: "Grant access to next course",
      urgency: "normal",
      icon: "🔓",
    },
    {
      id: 4,
      action: "Assign Peer Mentor",
      description: "Pair with a top performer",
      urgency: student.riskLevel === "High" ? "urgent" : "normal",
      icon: "👥",
    },
    {
      id: 5,
      action: "Reduce Course Load",
      description: "Adjust weekly goals",
      urgency: student.riskLevel === "High" ? "urgent" : "normal",
      icon: "⚙️",
    },
    {
      id: 6,
      action: "Congratulate Progress",
      description: "Encourage continued success",
      urgency: "normal",
      icon: "🎉",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {actions.map((act) => (
        <button
          key={act.id}
          className={`p-3 rounded-lg text-left transition ${
            act.urgency === "urgent"
              ? "bg-red-900 border border-red-700 hover:bg-red-800"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-lg">{act.icon}</span>
            <div>
              <p className="font-bold text-sm">{act.action}</p>
              <p className="text-xs text-slate-400">{act.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
