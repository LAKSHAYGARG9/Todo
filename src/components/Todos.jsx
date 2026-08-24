import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    CheckCircle2, 
    Circle, 
    Trash2, 
    Edit3, 
    Flag, 
    ListTodo, 
    Check, 
    X,
    Search,
    ArrowUpDown,
    Clock
} from "lucide-react";

import { removeTodo, toggleComplete, updateTodo, setFilter, clearCompleted } from "../store/todoSlice";

function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos);
    const filter = useSelector((state) => state.todo.filter || "all");

    // Search and Sort state
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Inline edit states
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [editingPriority, setEditingPriority] = useState("medium");

    // Start inline editing
    const handleStartEdit = (todo) => {
        setEditingId(todo.id);
        setEditingText(todo.title);
        setEditingPriority(todo.priority || "medium");
    };

    // Save inline edit
    const handleSaveEdit = () => {
        if (!editingText.trim()) return;
        dispatch(updateTodo({
            id: editingId,
            title: editingText.trim(),
            priority: editingPriority,
        }));
        setEditingId(null);
    };

    // Cancel inline edit
    const handleCancelEdit = () => {
        setEditingId(null);
    };

    // Priority badge helper styles
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "high":
                return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            case "low":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "medium":
            default:
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    // Date formatting helper
    const formatDate = (isoString) => {
        if (!isoString) return "";
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "";
        }
    };

    const priorityOrder = { high: 3, medium: 2, low: 1 };

    // Filter and Sort todos
    const filteredAndSortedTodos = todos
        .filter((todo) => {
            if (filter === "active" && todo.completed) return false;
            if (filter === "completed" && !todo.completed) return false;
            if (searchQuery.trim()) {
                return todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "priority-high") {
                return (priorityOrder[b.priority || "medium"] || 2) - (priorityOrder[a.priority || "medium"] || 2);
            }
            if (sortBy === "priority-low") {
                return (priorityOrder[a.priority || "medium"] || 2) - (priorityOrder[b.priority || "medium"] || 2);
            }
            if (sortBy === "oldest") {
                return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            }
            // Default: "newest"
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

    const completedCount = todos.filter((t) => t.completed).length;

    return (
        <div className="w-full max-w-2xl mx-auto my-6">
            {/* Header Controls: Title & Status Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
                <div className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-semibold text-slate-200">Your Tasks</h2>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-medium border border-slate-700/50">
                        {filteredAndSortedTodos.length}
                    </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    {["all", "active", "completed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => dispatch(setFilter(tab))}
                            className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                                filter === tab
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search & Sort Toolbar */}
            {todos.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full bg-slate-900/90 text-slate-200 text-xs placeholder:text-slate-500 pl-9 pr-8 py-2 rounded-xl border border-slate-800 focus:border-indigo-500/60 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-200"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                        <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-slate-400 font-medium">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-slate-200 text-xs outline-none cursor-pointer"
                        >
                            <option value="newest" className="bg-slate-900 text-slate-200">Newest First</option>
                            <option value="oldest" className="bg-slate-900 text-slate-200">Oldest First</option>
                            <option value="priority-high" className="bg-slate-900 text-slate-200">Priority: High to Low</option>
                            <option value="priority-low" className="bg-slate-900 text-slate-200">Priority: Low to High</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Empty State UI */}
            {filteredAndSortedTodos.length === 0 ? (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center shadow-lg">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                        <ListTodo className="w-6 h-6" />
                    </div>
                    <h3 className="text-slate-300 font-medium text-base mb-1">
                        {searchQuery
                            ? "No matching tasks found"
                            : filter === "all"
                            ? "No tasks yet"
                            : filter === "active"
                            ? "No active tasks"
                            : "No completed tasks"}
                    </h3>
                    <p className="text-slate-400 text-sm">
                        {searchQuery
                            ? `Try clearing your search query "${searchQuery}"`
                            : filter === "all"
                            ? "Add a task above to get started!"
                            : filter === "active"
                            ? "All tasks are completed!"
                            : "Complete some tasks to see them here."}
                    </p>
                </div>
            ) : (
                /* Task List Container */
                <ul className="space-y-3">
                    {filteredAndSortedTodos.map((todo) => {
                        const isCurrentEditing = editingId === todo.id;

                        if (isCurrentEditing) {
                            return (
                                <li
                                    key={todo.id}
                                    className="bg-slate-900/90 backdrop-blur-xl border border-indigo-500/50 rounded-xl p-4 flex flex-col gap-3 shadow-lg ring-2 ring-indigo-500/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleSaveEdit();
                                                if (e.key === "Escape") handleCancelEdit();
                                            }}
                                            className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 text-sm outline-none border border-slate-700 focus:border-indigo-500"
                                            placeholder="Update task title..."
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                                        {/* Priority Selector for Inline Edit */}
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-slate-400 mr-1">Priority:</span>
                                            {["low", "medium", "high"].map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setEditingPriority(p)}
                                                    className={`px-2.5 py-0.5 text-xs font-medium rounded-md border capitalize transition-all ${
                                                        editingPriority === p
                                                            ? p === "high"
                                                                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                                                : p === "low"
                                                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                                                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                                            : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Save / Cancel Buttons */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                                                aria-label="Cancel editing"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSaveEdit}
                                                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                                                aria-label="Save editing"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Save</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li
                                key={todo.id}
                                className={`group relative bg-slate-900/80 backdrop-blur-xl border rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 shadow-md ${
                                    todo.completed
                                        ? "border-slate-800/60 opacity-60"
                                        : "border-slate-800 hover:border-slate-700"
                                }`}
                            >
                                {/* Left Side: Complete Checkbox & Task Title & Timestamp */}
                                <div className="flex items-start gap-3 min-w-0 flex-1">
                                    <button
                                        type="button"
                                        onClick={() => dispatch(toggleComplete(todo.id))}
                                        className="mt-0.5 text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none cursor-pointer"
                                        aria-label="Toggle complete"
                                    >
                                        {todo.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        ) : (
                                            <Circle className="w-5 h-5" />
                                        )}
                                    </button>
                                    
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span
                                            className={`text-sm text-slate-200 truncate ${
                                                todo.completed ? "line-through text-slate-500" : ""
                                            }`}
                                        >
                                            {todo.title}
                                        </span>
                                        {todo.createdAt && (
                                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-normal">
                                                <Clock className="w-3 h-3 text-slate-600" />
                                                {formatDate(todo.createdAt)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Priority Badge & Action Icons */}
                                <div className="flex items-center gap-2">
                                    {/* Priority Badge */}
                                    <span
                                        className={`text-xs px-2.5 py-0.5 rounded-md border font-medium uppercase tracking-wider flex items-center gap-1 ${getPriorityStyle(
                                            todo.priority
                                        )}`}
                                    >
                                        <Flag className="w-3 h-3" />
                                        {todo.priority || "medium"}
                                    </span>

                                    {/* Edit Button Icon */}
                                    <button
                                        type="button"
                                        onClick={() => handleStartEdit(todo)}
                                        className="p-1.5 text-slate-400 hover:text-indigo-300 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                                        aria-label="Edit task"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>

                                    {/* Delete Button Icon */}
                                    <button
                                        type="button"
                                        onClick={() => dispatch(removeTodo(todo.id))}
                                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                                        aria-label="Delete task"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* Clear Completed Bar */}
            {completedCount > 0 && (
                <div className="flex justify-end mt-4 px-2">
                    <button
                        type="button"
                        onClick={() => dispatch(clearCompleted())}
                        className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear completed ({completedCount})</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Todos;
