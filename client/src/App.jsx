import './App.css'
import LoginPage from './components/login';
import Dashboard from './components/dash';
import { useState } from 'react'
import Home from './components/home';
import Tasks from './components/tasks';

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
            <Dashboard setPage={setPage} />
            {
              (page === 'home') ? <Home /> : <Tasks user={user} />
            }
          </div>
      }
    </>
  )
}

export default App
