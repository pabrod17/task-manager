import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './modules/tasks/components/Home'
import Navbar from './modules/tasks/components/NavBar'
import TaskList from './modules/tasks/components/TaskList'
import TaskDetail from './modules/tasks/components/TaskDetail'
import TaskCreate from './modules/tasks/components/TaskCreate'
function App() {

  return (
    <>
      <div className="dark">
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
          <BrowserRouter>
            <Navbar />
            <main className="flex-1 flex justify-center items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/tasks/:id" element={<TaskDetail />} />
                <Route path="/tasks/new" element={<TaskCreate />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
