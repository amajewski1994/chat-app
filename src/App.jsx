import { useState, useEffect, useRef } from "react"

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
  const [allUserMessages, setAllUserMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [activeFriend, setActiveFriend] = useState(null)

  const chatRef = useRef(null);

  const { token, login, logout, userId, avatar, onlineUsers, newMessage } = useAuth();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`
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
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
        );
        setUser(responseData.user)
        setAllUserMessages(responseData.user.messages)
      } catch (err) {
        console.log(err)
      }
    };

    getUser();
  }, [userId])

  useEffect(() => {
    if (!newMessage) return
    setAllUserMessages([...allUserMessages, newMessage])
  }, [newMessage])

  useEffect(() => {
    if (!activeFriend) return
    filterMessages(activeFriend._id)
  }, [allUserMessages])

  const openModal = (e) => {
    if (e.target.id === 'newFriendButton') {
      setSearchFriendModal(true)
    } else {
      setSearchFriendModal(false)
    }
    setModalIn(true)
  }

  const filterMessages = async (id) => {
    const userMessages = [...allUserMessages]
    const newFilteredMessages = userMessages.filter(message => message.recipient === id || message.author === id)
    setFilteredMessages(newFilteredMessages)
    setTimeout(() => {
      scrollChat()
    })
  }

  const scrollChat = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
    console.log('chat scroll')
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
      let request = `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`;
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
          onlineUsers: onlineUsers,
          login: login,
          logout: logout
        }}
      >
        <Layout />
        <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
          <Navbar openModal={openModal} />
          <Home user={user} openModal={openModal} userId={userId} allUserMessages={allUserMessages} setAllUserMessages={setAllUserMessages} filteredMessages={filteredMessages} filterMessages={filterMessages} activeFriend={activeFriend} setActiveFriend={setActiveFriend} chatRef={chatRef} scrollChat={scrollChat} />
          <Modal users={users} user={user} searchFriendModal={searchFriendModal} addFriendHandler={addFriendHandler} isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
