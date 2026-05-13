import { useState } from "react";
import {
  Plus,
  ArrowLeft,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
} from "lucide-react";

export function QuizzesPortal({ userRole = "instructor" }) {
  const [currentView, setCurrentView] = useState("list"); // list, assign, details
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({
    quizId: "",
    studentIds: [],
    dueDate: "",
    assignedBy: "Instructor Smith",
  });

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      quizId: 1,
      quizName: "Python Basics",
      studentId: 1,
      studentName: "Ali",
      assignedBy: "Instructor Smith",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-22",
      status: "pending",
      submitted: false,
      score: null,
      submittedDate: null,
    },
    {
      id: 2,
      quizId: 2,
      quizName: "SQL Fundamentals",
      studentId: 2,
      studentName: "Sara",
      assignedBy: "Instructor Smith",
      assignedDate: "2024-01-16",
      dueDate: "2024-01-23",
      status: "completed",
      submitted: true,
      score: 92,
      submittedDate: "2024-01-18",
    },
    {
      id: 3,
      quizId: 1,
      quizName: "Python Basics",
      studentId: 3,
      studentName: "Ahmed",
      assignedBy: "Instructor Smith",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-22",
      status: "overdue",
      submitted: false,
      score: null,
      submittedDate: null,
    },
  ]);

  const availableQuizzes = [
    {
      id: 1,
      name: "Python Basics",
      category: "Programming",
      questions: 3,
      duration: "15 mins",
      difficulty: "Beginner",
    },
    {
      id: 2,
      name: "SQL Fundamentals",
      category: "Database",
      questions: 3,
      duration: "15 mins",
      difficulty: "Beginner",
    },
    {
      id: 3,
      name: "Data Analytics",
      category: "Analytics",
      questions: 3,
      duration: "20 mins",
      difficulty: "Intermediate",
    },
    {
      id: 4,
      name: "Machine Learning",
      category: "AI/ML",
      questions: 3,
      duration: "25 mins",
      difficulty: "Advanced",
    },
  ];

  const students = [
    { id: 1, name: "Ali", email: "ali@atomcamp.com" },
    { id: 2, name: "Sara", email: "sara@atomcamp.com" },
    { id: 3, name: "Ahmed", email: "ahmed@atomcamp.com" },
    { id: 4, name: "Mina", email: "mina@atomcamp.com" },
  ];

  const handleAssignQuiz = () => {
    if (!assignmentForm.quizId || assignmentForm.studentIds.length === 0 || !assignmentForm.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    const quiz = availableQuizzes.find((q) => q.id == assignmentForm.quizId);
    const today = new Date().toISOString().split("T")[0];

    assignmentForm.studentIds.forEach((studentId) => {
      const newAssignment = {
        id: Math.max(...assignments.map((a) => a.id), 0) + 1,
        quizId: parseInt(assignmentForm.quizId),
        quizName: quiz.name,
        studentId: parseInt(studentId),
        studentName: students.find((s) => s.id == studentId)?.name,
        assignedBy: assignmentForm.assignedBy,
        assignedDate: today,
        dueDate: assignmentForm.dueDate,
        status: "pending",
        submitted: false,
        score: null,
        submittedDate: null,
      };
      setAssignments([...assignments, newAssignment]);
    });

    setAssignmentForm({
      quizId: "",
      studentIds: [],
      dueDate: "",
      assignedBy: "Instructor Smith",
    });
    setCurrentView("list");
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const handleStudentSelect = (studentId) => {
    setAssignmentForm((prev) => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter((id) => id !== studentId)
        : [...prev.studentIds, studentId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "overdue":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {currentView === "list" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Quiz Management</h2>
            {userRole === "instructor" && (
              <button
                onClick={() => setCurrentView("assign")}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition"
              >
                <Plus className="w-5 h-5" />
                Assign Quiz
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assignments Overview */}
            <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">
              <h3 className="text-xl font-bold mb-5">Quiz Assignments</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assignments.length === 0 ? (
                  <p className="text-slate-400">No assignments yet.</p>
                ) : (
                  assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-cyan-400">
                            {assignment.quizName}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {assignment.studentName}
                          </p>
                        </div>
                        <span
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            assignment.status
                          )}`}
                        >
                          {getStatusIcon(assignment.status)}
                          {assignment.status.charAt(0).toUpperCase() +
                            assignment.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          Due: {assignment.dueDate}
                        </div>
                        {assignment.submitted && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            Score: {assignment.score}%
                          </div>
                        )}
                      </div>
                      {userRole === "instructor" && (
                        <button
                          onClick={() =>
                            handleDeleteAssignment(assignment.id)
                          }
                          className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold py-2 rounded-lg hover:bg-red-500/10 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Assignment Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Assignments</p>
                    <h3 className="text-3xl font-bold text-cyan-400">
                      {assignments.length}
                    </h3>
                  </div>
                  <Clock className="w-10 h-10 text-cyan-500/50" />
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Completed</p>
                    <h3 className="text-3xl font-bold text-green-400">
                      {assignments.filter((a) => a.status === "completed")
                        .length}
                    </h3>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-500/50" />
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Overdue</p>
                    <h3 className="text-3xl font-bold text-red-400">
                      {assignments.filter((a) => a.status === "overdue")
                        .length}
                    </h3>
                  </div>
                  <AlertCircle className="w-10 h-10 text-red-500/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Available Quizzes */}
          <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">
            <h3 className="text-xl font-bold mb-5">Available Quizzes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer"
                >
                  <h4 className="font-semibold text-cyan-400 mb-2">
                    {quiz.name}
                  </h4>
                  <div className="space-y-2 text-sm text-slate-400">
                    <p>📚 {quiz.category}</p>
                    <p>❓ {quiz.questions} questions</p>
                    <p>⏱️ {quiz.duration}</p>
                    <p className="text-yellow-400">📊 {quiz.difficulty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {currentView === "assign" && (
        <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800 max-w-2xl">
          <button
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Quiz List
          </button>

          <h2 className="text-2xl font-bold mb-6">Assign Quiz</h2>

          <div className="space-y-6">
            {/* Select Quiz */}
            <div>
              <label className="text-sm text-slate-300 block mb-2">
                Select Quiz
              </label>
              <select
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                value={assignmentForm.quizId}
                onChange={(e) =>
                  setAssignmentForm({ ...assignmentForm, quizId: e.target.value })
                }
              >
                <option value="">-- Choose a Quiz --</option>
                {availableQuizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.name} ({quiz.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Students */}
            <div>
              <label className="text-sm text-slate-300 block mb-3">
                Assign to Students
              </label>
              <div className="space-y-2 bg-slate-800 rounded-xl p-4 border border-slate-700 max-h-48 overflow-y-auto">
                {students.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={assignmentForm.studentIds.includes(student.id)}
                      onChange={() => handleStudentSelect(student.id)}
                      className="w-4 h-4 rounded border-slate-600"
                    />
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-slate-400">{student.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm text-slate-300 block mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                value={assignmentForm.dueDate}
                onChange={(e) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>

            {/* Assigned By */}
            <div>
              <label className="text-sm text-slate-300 block mb-2">
                Assigned By
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                value={assignmentForm.assignedBy}
                readOnly
                disabled
              />
            </div>

            {/* Selected Students Summary */}
            {assignmentForm.studentIds.length > 0 && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <p className="text-sm text-cyan-300">
                  Assigning to {assignmentForm.studentIds.length} student
                  {assignmentForm.studentIds.length > 1 ? "s" : ""}:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {assignmentForm.studentIds.map((id) => {
                    const student = students.find((s) => s.id === id);
                    return (
                      <span
                        key={id}
                        className="bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm"
                      >
                        {student?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAssignQuiz}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition"
              >
                Assign Quiz
              </button>
              <button
                onClick={() => setCurrentView("list")}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
