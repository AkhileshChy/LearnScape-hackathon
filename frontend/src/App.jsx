import React from 'react'
import QuizPage from './pages/QuizPage'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import TopicPage from './pages/TopicPage'
import AiPage from './pages/AiPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/topic' element={<TopicPage />} /> 
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/aiquiz' element={<AiPage />} />
    </Routes>
  )
}

export default App
