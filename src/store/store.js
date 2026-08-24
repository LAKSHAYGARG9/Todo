import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem("todo_app_state", JSON.stringify(state.todo));
    } catch {
        // Ignore write errors
    }
});

export default store;