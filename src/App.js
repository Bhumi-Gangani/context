import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Users from './components/Users'
import { UserContextProvider } from './context/UserContext'


const App = () => {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/add" element={<Form />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

    </>
  )
}

export default App