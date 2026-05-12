import { UserExplorer } from './components/UserExplorer.jsx'
import { TaskManager } from './components/TaskManager.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskTracker</h1>
        <p className="app-tagline">
          Explorador de usuarios y gestor de tareas en un solo lugar.
        </p>
      </header>

      <main className="app-main">
        <section className="app-section" aria-labelledby="section-users-heading">
          <h2 id="section-users-heading">Explorador de usuarios</h2>
          <UserExplorer />
        </section>

        <section className="app-section" aria-labelledby="section-tasks-heading">
          <h2 id="section-tasks-heading">Gestor de tareas</h2>
          <TaskManager />
        </section>
      </main>
    </div>
  )
}

export default App
