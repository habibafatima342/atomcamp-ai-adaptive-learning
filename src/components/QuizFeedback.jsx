import { MessageCircle, Star, AlertCircle } from "lucide-react";
import { useState } from "react";

export function QuizFeedback({ students, onSubmitFeedback }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (selectedStudent && feedback.trim()) {
      onSubmitFeedback(selectedStudent.id, feedback);
      setFeedback("");
      setSelectedStudent(null);
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getPerformanceLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Critical";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Student List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          Students
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`w-full text-left p-3 rounded-xl transition ${
                selectedStudent?.id === student.id
                  ? "bg-cyan-500/20 border border-cyan-500/30"
                  : "hover:bg-slate-800"
              }`}
            >
              <div className="font-semibold">{student.name}</div>
              <div className={`text-sm ${getPerformanceColor(student.quizScore)}`}>
                {getPerformanceLabel(student.quizScore)} • {student.quizScore}%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
        {selectedStudent ? (
          <>
            <div className="mb-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <h3 className="font-bold text-lg mb-3">{selectedStudent.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Quiz Score</p>
                  <p className={`font-bold text-lg ${getPerformanceColor(selectedStudent.quizScore)}`}>
                    {selectedStudent.quizScore}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Progress</p>
                  <p className="font-bold text-lg text-cyan-400">{selectedStudent.progress}%</p>
                </div>
                <div>
                  <p className="text-slate-400">Level</p>
                  <p className="font-bold text-lg text-purple-400">{selectedStudent.level || "Intermediate"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Weak Topic</p>
                  <p className="font-bold text-lg text-yellow-400">{selectedStudent.weak}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Personalized Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write specific feedback about their performance, strengths, and areas to improve..."
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none resize-none h-32"
                />
              </div>

              <div className="bg-slate-800 rounded-xl p-4 text-sm text-slate-400 space-y-2">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Tip:</strong> Mention specific quiz questions or topics</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Encourage:</strong> Acknowledge effort and progress</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!feedback.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition"
              >
                Send Feedback
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a student to provide feedback</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
