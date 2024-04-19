import './App.css'
import LoginPage from './components/login';
import Dashboard from './components/dash';
import { useState } from 'react'
import Home from './components/home';
import Tasks from './components/tasks';
import Productivity from './components/productivity';

function App() {
  const [page,setPage] = useState('home')
  const [user, setUser] = useState(null);
  return (
    <>
      {
        (user === null) ?
          <LoginPage setUser={setUser} />
          :
          <div className='flex'>
            <Dashboard setPage={setPage} setUser={setUser} />
            {
              (page === 'home') ? <Home /> :
                (page === 'tasks') ? <Tasks user={user} /> :
                  <Productivity user={user} />
            }
          </div>
      }
    </>
  )
}

export default App
