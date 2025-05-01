import Chatpage from "./pages/ChatPage"
import UserListPage from './pages/UserLIstPage'
import AuthUserPage from "./pages/AuthUserPage";
import DashBoardPage from "./pages/DashBoardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authuser" element={<AuthUserPage />} />


        <Route path="/" element={

          <AuthProvider>
            <DashBoardPage />
          </AuthProvider>

        } />


        <Route path="/chat" element={<Chatpage />} />
        <Route path="/userlist" element={<UserListPage />} />
      </Routes >


    </BrowserRouter>
  )
}

export default App
