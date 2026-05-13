// Mock Database for Student Data
// In production, this would connect to a backend database

const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: "Ali",
    email: "ali@atomcamp.com",
    registeredDate: "2024-01-01",
    testScore: 45,
    level: "Beginner",
    progress: 32,
    quizScore: 45,
    weak: "Python Basics",
    status: "At Risk",
    quizHistory: [
      { id: 1, name: "Python Basics", score: 45, date: "2024-01-15", category: "Programming" },
      { id: 2, name: "SQL Fundamentals", score: 38, date: "2024-01-10", category: "Database" },
      { id: 3, name: "Data Analytics", score: 42, date: "2024-01-05", category: "Analytics" },
    ],
    categoryScores: { Programming: 42, Database: 38, Analytics: 42, ML: 0 },
    roadmap: "Focus on Python Basics first, then SQL fundamentals.",
  },
  {
    id: 2,
    name: "Sara",
    email: "sara@atomcamp.com",
    registeredDate: "2024-01-02",
    testScore: 72,
    level: "Intermediate",
    progress: 61,
    quizScore: 72,
    weak: "SQL Joins",
    status: "On Track",
    quizHistory: [
      { id: 1, name: "Python Basics", score: 85, date: "2024-01-16", category: "Programming" },
      { id: 2, name: "SQL Fundamentals", score: 72, date: "2024-01-14", category: "Database" },
      { id: 3, name: "Data Analytics", score: 68, date: "2024-01-12", category: "Analytics" },
    ],
    categoryScores: { Programming: 85, Database: 72, Analytics: 68, ML: 0 },
    roadmap: "Good progress! Next: SQL Advanced Topics and Data Analytics.",
  },
  {
    id: 3,
    name: "Ahmed",
    email: "ahmed@atomcamp.com",
    registeredDate: "2024-01-01",
    testScore: 88,
    level: "Advanced",
    progress: 78,
    quizScore: 88,
    weak: "ML Models",
    status: "Excelling",
    quizHistory: [
      { id: 1, name: "Python Basics", score: 95, date: "2024-01-16", category: "Programming" },
      { id: 2, name: "SQL Fundamentals", score: 82, date: "2024-01-14", category: "Database" },
      { id: 3, name: "Data Analytics", score: 88, date: "2024-01-12", category: "Analytics" },
    ],
    categoryScores: { Programming: 95, Database: 82, Analytics: 88, ML: 0 },
    roadmap: "Excellent! Ready for Machine Learning and Advanced Topics.",
  },
  {
    id: 4,
    name: "Mina",
    email: "mina@atomcamp.com",
    registeredDate: "2024-01-05",
    testScore: 49,
    level: "Beginner",
    progress: 38,
    quizScore: 49,
    weak: "Data Cleaning",
    status: "At Risk",
    quizHistory: [
      { id: 1, name: "Python Basics", score: 55, date: "2024-01-14", category: "Programming" },
      { id: 2, name: "SQL Fundamentals", score: 40, date: "2024-01-12", category: "Database" },
      { id: 3, name: "Data Analytics", score: 49, date: "2024-01-10", category: "Analytics" },
    ],
    categoryScores: { Programming: 55, Database: 40, Analytics: 49, ML: 0 },
    roadmap: "Personalized plan: Focus on fundamentals with shorter modules.",
  },
];

class StudentDatabase {
  constructor() {
    this.students = this.loadFromLocalStorage() || DEFAULT_STUDENTS;
  }

  // Load from localStorage
  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem("atomcamp_students");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log("Failed to load from localStorage, using defaults");
      return null;
    }
  }

  // Save to localStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem("atomcamp_students", JSON.stringify(this.students));
    } catch (error) {
      console.log("Failed to save to localStorage");
    }
  }

  // Get all students
  getAllStudents() {
    return this.students;
  }

  // Get student by ID
  getStudentById(id) {
    return this.students.find((s) => s.id === id);
  }

  // Add new student
  addStudent(studentData) {
    const newStudent = {
      id: Math.max(...this.students.map((s) => s.id), 0) + 1,
      registeredDate: new Date().toISOString().split("T")[0],
      quizHistory: [],
      ...studentData,
    };

    this.students.push(newStudent);
    this.saveToLocalStorage();
    return newStudent;
  }

  // Update student
  updateStudent(id, updates) {
    const student = this.getStudentById(id);
    if (student) {
      Object.assign(student, updates);
      this.saveToLocalStorage();
      return student;
    }
    return null;
  }

  // Add quiz result to student
  addQuizResult(studentId, quizResult) {
    const student = this.getStudentById(studentId);
    if (student) {
      student.quizHistory.push({
        ...quizResult,
        date: new Date().toISOString().split("T")[0],
      });

      // Update overall quiz score
      const avgScore = Math.round(
        student.quizHistory.reduce((sum, q) => sum + q.score, 0) /
          student.quizHistory.length
      );
      student.quizScore = avgScore;

      this.saveToLocalStorage();
      return student;
    }
    return null;
  }

  // Get student statistics
  getStatistics() {
    const students = this.students;
    const totalStudents = students.length;
    const averageScore = Math.round(
      students.reduce((sum, s) => sum + s.quizScore, 0) / totalStudents
    );
    const atRiskCount = students.filter(
      (s) => s.progress < 40 || s.quizScore < 50
    ).length;

    return {
      totalStudents,
      averageScore,
      atRiskCount,
      students,
    };
  }

  // Get category-wise statistics
  getCategoryStatistics() {
    const categories = {
      Programming: [],
      Database: [],
      Analytics: [],
      ML: [],
    };

    this.students.forEach((student) => {
      Object.entries(student.categoryScores).forEach(([category, score]) => {
        if (categories[category]) {
          categories[category].push(score);
        }
      });
    });

    // Calculate averages
    const averages = {};
    Object.entries(categories).forEach(([category, scores]) => {
      averages[category] =
        scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0;
    });

    return averages;
  }

  // Generate recommendations
  generateRecommendations(studentId) {
    const student = this.getStudentById(studentId);
    if (!student) return [];

    const recommendations = [];

    // Based on overall score
    if (student.quizScore < 50) {
      recommendations.push({
        type: "urgent",
        title: "❌ Critical: Low Quiz Performance",
        action: "Schedule 1-on-1 mentoring session",
        details: "Score is below 50%. Recommend revision module.",
      });
    } else if (student.quizScore < 70) {
      recommendations.push({
        type: "warning",
        title: "⚠️ Needs Improvement",
        action: "Assign practice problems",
        details: "Score is below average. Send extra practice materials.",
      });
    }

    // Based on progress
    if (student.progress < 40) {
      recommendations.push({
        type: "urgent",
        title: "❌ Slow Progress",
        action: "Reduce course load or extend deadline",
        details: "Progress is lagging. Consider personalized timeline.",
      });
    }

    // Based on category scores
    Object.entries(student.categoryScores).forEach(([category, score]) => {
      if (score < 50 && score > 0) {
        recommendations.push({
          type: "warning",
          title: `⚠️ Weak in ${category}`,
          action: `Create ${category} revision module`,
          details: `${category} score is low. Extra practice needed.`,
        });
      }
    });

    return recommendations;
  }

  // Reset all data to defaults
  resetToDefaults() {
    this.students = DEFAULT_STUDENTS;
    this.saveToLocalStorage();
  }
}

export const studentDB = new StudentDatabase();
