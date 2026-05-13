import { GraduationCap, Users } from "lucide-react";

export function RoleSelection({ onSelectRole }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">Welcome to Atomcamp AI</h1>
          <p className="text-slate-400 text-lg">
            Choose your role to get started with adaptive learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <button
            onClick={() => onSelectRole("student")}
            className="group relative overflow-hidden rounded-3xl border-2 border-slate-800 hover:border-cyan-500 transition-all duration-300 p-12 text-center hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="inline-block p-6 bg-cyan-500/20 rounded-2xl mb-6 group-hover:bg-cyan-500/30 transition">
                <GraduationCap className="w-12 h-12 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Student</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Access your personalized learning roadmap, take quizzes, track progress, and get AI mentor support
              </p>
              <ul className="text-left space-y-2 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Personalized Learning Path
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> AI Mentor Support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Quiz Assessments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Progress Tracking
                </li>
              </ul>
              <div className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3 rounded-xl transition">
                Continue as Student
              </div>
            </div>
          </button>

          {/* Instructor Card */}
          <button
            onClick={() => onSelectRole("instructor")}
            className="group relative overflow-hidden rounded-3xl border-2 border-slate-800 hover:border-purple-500 transition-all duration-300 p-12 text-center hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="inline-block p-6 bg-purple-500/20 rounded-2xl mb-6 group-hover:bg-purple-500/30 transition">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Instructor</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Manage quizzes, assign assessments to students, track performance, and make data-driven decisions
              </p>
              <ul className="text-left space-y-2 text-slate-300 text-sm mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Quiz Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Assign to Students
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Student Analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Performance Tracking
                </li>
              </ul>
              <div className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold px-8 py-3 rounded-xl transition">
                Continue as Instructor
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>🔒 Your role and data are kept secure and private</p>
        </div>
      </div>
    </div>
  );
}
