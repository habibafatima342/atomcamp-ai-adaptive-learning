import { CheckCircle, Circle, Lock, Zap } from "lucide-react";
import { useState } from "react";

export function RoadmapTimeline({ roadmapText }) {
  const [completedSteps, setCompletedSteps] = useState({});

  // Parse roadmap into steps
  const parseRoadmap = (text) => {
    const lines = text.split("\n").filter((line) => line.trim());
    return lines
      .map((line) => {
        const match = line.match(/^(\d+)\.\s*(.+?)\s*—\s*(.+)$/);
        if (match) {
          return {
            id: parseInt(match[1]),
            title: match[2].trim(),
            description: match[3].trim(),
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const steps = parseRoadmap(roadmapText);
  const progressPercent = steps.length > 0 
    ? Math.round((Object.keys(completedSteps).length / steps.length) * 100)
    : 0;

  const toggleStep = (stepId) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const getIcon = (stepId) => {
    if (completedSteps[stepId]) {
      return <CheckCircle className="w-6 h-6 text-green-400" />;
    }
    return <Circle className="w-6 h-6 text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Learning Roadmap Progress</h3>
          <span className="text-2xl font-bold text-cyan-400">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-slate-400 mt-3 text-sm">
          {Object.keys(completedSteps).length} of {steps.length} steps completed
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[step.id];
          const isCurrent = index < Object.keys(completedSteps).length || Object.keys(completedSteps).length === 0;

          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-3 top-12 h-12 w-1 rounded-full transition-all ${
                    isCompleted ? "bg-gradient-to-b from-green-400 to-cyan-400" : "bg-slate-700"
                  }`}
                ></div>
              )}

              {/* Step Card */}
              <div
                onClick={() => toggleStep(step.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isCompleted
                    ? "bg-green-500/10 border-green-500/30"
                    : isCurrent
                    ? "bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">{getIcon(step.id)}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold">{step.title}</h4>
                        <p className="text-slate-400 mt-2 text-sm">{step.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold">
                            ✓ Completed
                          </span>
                        ) : (
                          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Action Hint */}
                    {!isCompleted && isCurrent && (
                      <div className="mt-3 flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                        Click to mark as complete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {progressPercent === 100 && steps.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-green-300 mb-2">Roadmap Complete!</h3>
          <p className="text-slate-300">
            Excellent progress! You've completed all steps. Continue with advanced topics or start a new learning path.
          </p>
        </div>
      )}
    </div>
  );
}
