import { useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  GraduationCap,
  Bot,
  BarChart3,
  Sparkles,
  AlertTriangle,
  Trophy,
  Send,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API = "http://127.0.0.1:5000";

function App() {
  const [activePage, setActivePage] = useState("onboarding");
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    level: "Beginner",
    goal: "",
    interests: "",
    weakAreas: "",
    hours: "",
  });

  const [roadmap, setRoadmap] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "ai",
      text: "Hi! I am your Atomcamp AI Mentor. Ask me anything about learning, courses, or your roadmap.",
    },
  ]);

  const instructorStats = {
    totalLearners: 45,
    averageCompletion: "68%",
    atRisk: 7,
    dropoutRisk: "Medium",
    weakTopics: ["Python Loops", "SQL Joins", "Data Cleaning", "ML Models"],
    topPerformers: ["Ayesha", "Hamza", "Zain"],
  };

  const students = [
    { name: "Ali", progress: 32, quiz: 45, weak: "Python Basics" },
    { name: "Sara", progress: 61, quiz: 72, weak: "SQL Joins" },
    { name: "Ahmed", progress: 78, quiz: 88, weak: "ML Models" },
    { name: "Mina", progress: 38, quiz: 49, weak: "Data Cleaning" },
  ];

  const chartData = [
    { course: "Python", learners: 30 },
    { course: "SQL", learners: 22 },
    { course: "AI", learners: 18 },
    { course: "Cloud", learners: 12 },
  ];

  const riskData = [
    { name: "High Risk", value: 7 },
    { name: "Medium Risk", value: 14 },
    { name: "Low Risk", value: 24 },
  ];

  const riskColor = ["#ef4444", "#f59e0b", "#22c55e"];

  const getRisk = (progress) => {
    if (progress < 40) return "High";
    if (progress <= 70) return "Medium";
    return "Low";
  };

  const getSuggestion = (quiz, progress) => {
    if (quiz < 50) return "Recommend revision module and mentor follow-up.";
    if (progress < 40) return "Send reminder and create smaller weekly goals.";
    return "Unlock advanced module.";
  };

  const generatePath = async () => {
    setLoading(true);
    setRoadmap("");

    try {
      const res = await axios.post(`${API}/roadmap`, {
        goal: student.goal,
        level: student.level,
        hours: student.hours,
      });

      setRoadmap(res.data.roadmap);
      setActivePage("student");
    } catch (error) {
      setRoadmap(
        "Demo Roadmap:\n\n1. Python for Beginners — build programming base.\n2. SQL Fundamentals — learn data storage and queries.\n3. Data Analytics Bootcamp — learn analysis using real datasets.\n4. Machine Learning Foundations — understand model training.\n5. Capstone Project — build a complete AI solution.\n\nNext Best Action: Complete Python basics revision this week."
      );
      setActivePage("student");
    }

    setLoading(false);
  };

  const sendChat = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const res = await axios.post(`${API}/tutor`, {
        question: message,
      });

      setChat((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Demo answer: Focus on your weak topic first, revise the concept, then solve 3 practice questions. I recommend starting with Python for Beginners.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-cyan-500 p-3 rounded-2xl">
            <Sparkles className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Atomcamp AI</h1>
            <p className="text-xs text-slate-400">Adaptive Learning Layer</p>
          </div>
        </div>

        <nav className="space-y-3">
          <NavButton
            label="Onboarding"
            icon={<GraduationCap />}
            active={activePage === "onboarding"}
            onClick={() => setActivePage("onboarding")}
          />
          <NavButton
            label="Student Dashboard"
            icon={<LayoutDashboard />}
            active={activePage === "student"}
            onClick={() => setActivePage("student")}
          />
          <NavButton
            label="AI Mentor"
            icon={<Bot />}
            active={activePage === "mentor"}
            onClick={() => setActivePage("mentor")}
          />
          <NavButton
            label="Instructor Analytics"
            icon={<BarChart3 />}
            active={activePage === "instructor"}
            onClick={() => setActivePage("instructor")}
          />
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Atomcamp AI Adaptive Learning Layer
          </h1>
          <p className="text-slate-400 mt-2">
            AI-powered personalization and instructor intelligence for
            Atomcamp’s existing learning platform.
          </p>
        </header>

        {activePage === "onboarding" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Student Onboarding</h2>
              <p className="text-slate-400 mb-6">
                Collect learner goals and generate a personalized AI roadmap.
              </p>

              <div className="space-y-4">
                <Input
                  label="Name"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                  placeholder="e.g. Habiba"
                />

                <div>
                  <label className="text-sm text-slate-300">Skill Level</label>
                  <select
                    className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                    value={student.level}
                    onChange={(e) =>
                      setStudent({ ...student, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <Input
                  label="Career Goal"
                  value={student.goal}
                  onChange={(e) =>
                    setStudent({ ...student, goal: e.target.value })
                  }
                  placeholder="e.g. Become a Data Scientist"
                />

                <Input
                  label="Interests"
                  value={student.interests}
                  onChange={(e) =>
                    setStudent({ ...student, interests: e.target.value })
                  }
                  placeholder="AI, data analytics, cloud..."
                />

                <Input
                  label="Weak Areas"
                  value={student.weakAreas}
                  onChange={(e) =>
                    setStudent({ ...student, weakAreas: e.target.value })
                  }
                  placeholder="Python loops, SQL joins..."
                />

                <Input
                  label="Study Hours Per Week"
                  value={student.hours}
                  onChange={(e) =>
                    setStudent({ ...student, hours: e.target.value })
                  }
                  placeholder="e.g. 8"
                />

                <button
                  onClick={generatePath}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition"
                >
                  {loading ? "Generating..." : "Generate AI Learning Path"}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl p-7 border border-cyan-500/30">
              <h2 className="text-2xl font-bold mb-4">What this solves</h2>
              <div className="space-y-4 text-slate-300">
                <Feature text="Replaces static course catalogues with personalized learning paths." />
                <Feature text="Uses AI mentor support to guide learners in real time." />
                <Feature text="Detects weak topics and suggests next best actions." />
                <Feature text="Gives instructors visibility into struggling students." />
              </div>
            </div>
          </section>
        )}

        {activePage === "student" && (
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Card title="Progress" value="64%" />
              <Card title="Current Course" value="Python Basics" />
              <Card title="Quiz Score" value="48%" />
              <Card title="Learning Streak" value="6 Days" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-7 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">
                  Personalized AI Roadmap
                </h2>
                <pre className="whitespace-pre-wrap text-slate-300 leading-7">
                  {roadmap ||
                    "Submit onboarding form to generate personalized roadmap."}
                </pre>
              </div>

              <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">
                <h2 className="text-2xl font-bold mb-4">Adaptive Insight</h2>

                <div className="space-y-5">
                  <Info label="Weak Topic" value="Python Loops" />
                  <Info
                    label="AI Next Step"
                    value="Revise loop basics and attempt 5 practice questions."
                  />
                  <Info label="Weekly Goal" value="Complete Python Module 2" />

                  <div>
                    <p className="text-sm text-slate-400 mb-2">Progress</p>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div className="bg-cyan-400 h-3 rounded-full w-[64%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "mentor" && (
          <section className="bg-slate-900 rounded-3xl border border-slate-800 p-7 max-w-4xl">
            <h2 className="text-2xl font-bold mb-5">AI Mentor Chatbot</h2>

            <div className="h-[430px] overflow-y-auto bg-slate-950 rounded-2xl p-5 space-y-4 border border-slate-800">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 ml-auto"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <input
                className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
                placeholder="Ask your AI mentor..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendChat}
                className="bg-cyan-500 text-slate-950 px-5 rounded-xl font-bold"
              >
                <Send />
              </button>
            </div>
          </section>
        )}

        {activePage === "instructor" && (
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Card title="Total Learners" value={instructorStats.totalLearners} />
              <Card
                title="Average Completion"
                value={instructorStats.averageCompletion}
              />
              <Card title="At-Risk Students" value={instructorStats.atRisk} />
              <Card title="Dropout Risk" value={instructorStats.dropoutRisk} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Course Popularity">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="course" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="learners" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Dropout Risk Distribution">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={riskData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={index} fill={riskColor[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7">
              <h2 className="text-2xl font-bold mb-5">
                Student Risk Radar
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3">Student</th>
                      <th>Progress</th>
                      <th>Quiz</th>
                      <th>Weak Topic</th>
                      <th>Risk</th>
                      <th>AI Intervention</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((s, i) => (
                      <tr key={i} className="border-b border-slate-800">
                        <td className="py-4 font-semibold">{s.name}</td>
                        <td>{s.progress}%</td>
                        <td>{s.quiz}%</td>
                        <td>{s.weak}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              getRisk(s.progress) === "High"
                                ? "bg-red-500/20 text-red-300"
                                : getRisk(s.progress) === "Medium"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {getRisk(s.progress)}
                          </span>
                        </td>
                        <td className="text-slate-300">
                          {getSuggestion(s.quiz, s.progress)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SmallPanel
                icon={<AlertTriangle />}
                title="Weak Topics"
                items={instructorStats.weakTopics}
              />
              <SmallPanel
                icon={<Trophy />}
                title="Top Performers"
                items={instructorStats.topPerformers}
              />
              <SmallPanel
                icon={<Sparkles />}
                title="AI Suggestions"
                items={[
                  "Create Python revision session.",
                  "Send mentor alert to high-risk learners.",
                  "Add SQL practice quiz.",
                ]}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function NavButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
        active
          ? "bg-cyan-500 text-slate-950 font-bold"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      {label}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <input
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"
      />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
      <p className="text-slate-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-white font-semibold mt-1">{value}</p>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-700">
      {text}
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      {children}
    </div>
  );
}

function SmallPanel({ icon, title, items }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-cyan-400">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <ul className="space-y-2 text-slate-300">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;