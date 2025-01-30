import { useState } from "react"

import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"
import Modal from "./Components/Modal"

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

function App() {

  const [modalIn, setModalIn] = useState(false)
  const [modalForm, setModalForm] = useState(false)
  const [searchFriendModal, setSearchFriendModal] = useState(false)

  const { token, login, logout, userId, role, avatar } = useAuth();

  const openModal = (e) => {
    if (e.target.id === 'newFriendButton') {
      setSearchFriendModal(true)
    } else {
      setSearchFriendModal(false)
    }
    setModalIn(true)
  }

  const closeModal = () => {
    setModalIn(false)
    setModalForm(false)
  }

  const switchModal = () => {
    setModalForm(prevModalForm => !prevModalForm)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          role: role,
          avatar: avatar,
          login: login,
          logout: logout
        }}
      >
        <Layout />
        <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
          <Navbar openModal={openModal} />
          <Home openModal={openModal} />
          <Modal searchFriendModal={searchFriendModal} isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
