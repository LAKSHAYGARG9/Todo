import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { Plus, X, Flag, Sparkles } from "lucide-react";

const priorityOptions = [
        { id: "low", label: "Low", color: "emerald", activeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", inactiveBg: "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:bg-slate-700/50" },
        { id: "medium", label: "Medium", color: "amber", activeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40", inactiveBg: "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:bg-slate-700/50" },
        { id: "high", label: "High", color: "rose", activeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40", inactiveBg: "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:bg-slate-700/50" },
    ];

function AddTodo() {
    const [input, setInput] = useState("");
    const [priority, setPriority] = useState("medium");
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        dispatch(addTodo({ title: input.trim(), priority }));
        setInput("");
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-6">
            <form
                onSubmit={addTodoHandler}
                className={`relative bg-slate-900/80 backdrop-blur-xl border ${
                    isFocused ? "border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10" : "border-slate-800 hover:border-slate-700"
                } rounded-2xl p-4 transition-all duration-300 shadow-xl`}
            >
                {/* Header / Subtitle */}
                <div className="flex items-center gap-2 mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <span>Create New Task</span>
                </div>

                {/* Main Input Row */}
                <div className="relative flex items-center mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="What needs to be done today?..."
                        className="w-full bg-slate-950/60 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3.5 pr-10 text-base outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all duration-200"
                    />
                    {input && (
                        <button
                            type="button"
                            onClick={() => setInput("")}
                            className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/80 transition-colors"
                            aria-label="Clear input"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Bottom Bar: Priority Selector & Submit Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                    {/* Priority Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                            <Flag className="w-3.5 h-3.5" />
                            Priority:
                        </span>
                        <div className="flex items-center gap-1.5">
                            {priorityOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setPriority(opt.id)}
                                    className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all duration-200 ${
                                        priority === opt.id ? opt.activeBg : opt.inactiveBg
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add Task</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodo;
