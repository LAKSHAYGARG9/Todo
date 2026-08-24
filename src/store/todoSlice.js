import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("todo_app_state");
        if (serializedState === null) {
            return { todos: [], filter: "all" };
        }
        const parsed = JSON.parse(serializedState);
        return {
            todos: Array.isArray(parsed.todos) ? parsed.todos : [],
            filter: parsed.filter || "all",
        };
    } catch {
        return { todos: [], filter: "all" };
    }
};

const initialState = loadState();

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const isObject = typeof action.payload === "object" && action.payload !== null;
            const title = isObject ? action.payload.title : action.payload;
            const priority = isObject && action.payload.priority ? action.payload.priority : "medium";

            const todo = {
                id: nanoid(),
                title: title,
                completed: false,
                priority: priority, 
                createdAt: new Date().toISOString(),
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== id);
        },
        updateTodo: (state, action) => {
            const { id, title, priority } = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if (existingTodo) {
                if (title !== undefined) existingTodo.title = title;
                if (priority !== undefined) existingTodo.priority = priority;
            }
        },
        toggleComplete: (state, action) => {
            const id = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if (existingTodo) {
                existingTodo.completed = !existingTodo.completed;
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
    },
});


export const {
    addTodo,
    removeTodo,
    updateTodo,
    toggleComplete,
    setFilter,
    clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;

