import './App.css'
import LoginPage from './components/login';
import Dashboard from './components/dash';
import { useState } from 'react'
import Home from './components/home';
import Tasks from './components/tasks';
import Productivity from './components/productivity';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

function App() {
  const [page,setPage] = useState('home')
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  return (
    <>
      {
        (user === null) ?
          <LoginPage setUser={setUser} />
          :
          <div className='flex'>
            <Dashboard setPage={setPage} setUser={setUser} setNotifications={setNotifications} notifications={notifications} />
            {
              (page === 'home') ? <Home /> :
                (page === 'tasks') ? <Tasks user={user} socket={socket} notifications={notifications}/> :
                  <Productivity user={user} />
            }
          </div>
      }
    </>
  )
}

export default App
