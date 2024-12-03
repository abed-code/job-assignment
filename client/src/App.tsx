import { Route, Routes, Navigate } from "react-router"
import Repos from "./components/repos/Repos"
import Login from "./components/auth/Login"
import AuthCallback from "./components/auth/AuthCallback"
import { useEffect } from "react"
import { useAppStore } from "./store"

function App() {
  const token = localStorage.getItem('access_token')
  const fetchUserData = useAppStore(state => state.fetchUserData)

  useEffect(() => {
    if(token) {
      fetchUserData(token)
    }
  }, [fetchUserData, token])

  return (
    <div>
      <Routes>
        <Route index element={token ? <Repos /> : <Navigate to="auth" />} />
        <Route path="auth" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="auth/callback" element={<AuthCallback />} />
      </Routes>
    </div>
  )
}

export default App
