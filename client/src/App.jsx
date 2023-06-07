import './App.css'
import RegisterPage from './pages/register-page'
import LoginPage from './pages/login-page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toolbar from './components/toolbar'
import ChatPage from './pages/ChatPage'
import UsersPage from './pages/UsersPage'
import PostsPage from './pages/PostsPage'
import SinglePostPage from './components/SinglePostPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ParticularUserProfilePage from './pages/ParticularUserProfilePage'
import ConversationsPage from './pages/ConversationsPage'

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/allusers" element={<UsersPage />} />
          <Route path="/user/:username" element={<ParticularUserProfilePage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<SinglePostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
