import { useState } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import ChatInterface from './components/ChatInterface'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatInterface />
      )}
    </div>
  )
}

export default App
