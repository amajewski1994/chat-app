import { useState, useEffect } from "react"

import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"
import Modal from "./Components/Modal"

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

import { useHttpClient } from './hooks/http-hook';

function App() {

  const [modalIn, setModalIn] = useState(false)
  const [modalForm, setModalForm] = useState(false)
  const [searchFriendModal, setSearchFriendModal] = useState(false)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(false)

  const { token, login, logout, userId, avatar } = useAuth();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
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

    getUsers();
  }, [])

  useEffect(() => {
    const getUser = async () => {
      if (!userId) return setUser(null)
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
          // `${process.env.REACT_APP_BACKEND_URL}/items/${params.iid}`
        );
        setUser(responseData.user)
      } catch (err) {
        console.log(err)
      }
    };

    getUser();
  }, [userId])

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

  const addFriendHandler = async (friendID, setSearchFriendList) => {
    if (!user) return
    const obj = {
      friendID
    }
    try {
      let request = `http://localhost:5000/api/users/${user._id}`;
      // let request = `${process.env.REACT_APP_BACKEND_URL}/${props.request}`;
      const responseData = await sendRequest(request, 'PATCH',
        JSON.stringify(obj),
        {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + auth.token
        }
      );
      const userClone = await { ...user }
      await userClone.friends.push(responseData.newFriend)
      await setUser(userClone)
      await closeModal()
      await setSearchFriendList(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          avatar: avatar,
          login: login,
          logout: logout
        }}
      >
        <Layout />
        <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
          <Navbar openModal={openModal} />
          <Home user={user} openModal={openModal} userId={userId} />
          <Modal users={users} user={user} searchFriendModal={searchFriendModal} addFriendHandler={addFriendHandler} isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
