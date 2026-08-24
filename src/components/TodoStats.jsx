import { useSelector } from "react-redux";
import { CheckSquare, Clock, CheckCircle2, AlertTriangle, Flag } from "lucide-react";

function TodoStats() {
    const todos = useSelector((state) => state.todo.todos);

    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const highPriority = todos.filter((t) => t.priority === "high").length;
    const mediumPriority = todos.filter((t) => (t.priority || "medium") === "medium").length;
    const lowPriority = todos.filter((t) => t.priority === "low").length;

    if (total === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-2xl mx-auto mb-6 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                    <span>Task Overview</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {completionPercentage}% Done
                </span>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
                        <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Total</span>
                    </div>
                    <p className="text-xl font-bold text-slate-100">{total}</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-400/90 text-xs mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                    </div>
                    <p className="text-xl font-bold text-amber-300">{active}</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-400/90 text-xs mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                    </div>
                    <p className="text-xl font-bold text-emerald-300">{completed}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 mb-4">
                <div className="w-full bg-slate-950/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
                    <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>

            {/* Priority Breakdown Pills */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5" />
                    By Priority:
                </span>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        High: {highPriority}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                        Medium: {mediumPriority}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        Low: {lowPriority}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TodoStats;
