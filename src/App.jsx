import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import TodoStats from './components/TodoStats'
import { CheckSquare } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 flex flex-col items-center">
      {/* App Header */}
      <header className="w-full max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-3 shadow-lg shadow-indigo-500/5">
          <CheckSquare className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            TaskMaster Pro
          </h1>
        </div>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Organize your daily workflow, set priority levels, and track task completion seamlessly.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="w-full max-w-2xl">
        <AddTodo />
        <TodoStats />
        <Todos />
      </main>
    </div>
  )
}

export default App
