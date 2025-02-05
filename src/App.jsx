import { useState, useEffect } from "react"

import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"
import Modal from "./Components/Modal"

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

import { useHttpClient } from './hooks/http-hook';

const DUMMY_USER_ID = '67a21729c5636ab3fa072744'

function App() {

  const [modalIn, setModalIn] = useState(false)
  const [modalForm, setModalForm] = useState(false)
  const [searchFriendModal, setSearchFriendModal] = useState(false)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(false)

  const { token, login, logout, userId, role, avatar } = useAuth();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${DUMMY_USER_ID}`
          // `${process.env.REACT_APP_BACKEND_URL}/items/${params.iid}`
        );
        setUser(responseData.user)

      } catch (err) {
        console.log(err)
      }
    };

    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/`
          // `${process.env.REACT_APP_BACKEND_URL}/items/${params.iid}`
        );
        setUsers(responseData.users)
      } catch (err) {
        console.log(err)
      }
    };

    getUser();
    getUsers();
  }, [])

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
          <Home user={user} openModal={openModal} DUMMY_USER_ID={DUMMY_USER_ID} />
          <Modal users={users} user={user} searchFriendModal={searchFriendModal} isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
