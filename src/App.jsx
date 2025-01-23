import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"
import Modal from "./Components/Modal"
import { useState } from "react"

function App() {

  const [modalIn, setModalIn] = useState(false)
  const [modalForm, setModalForm] = useState(false)
  const [searchFriendModal, setSearchFriendModal] = useState(false)

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
      <Layout />
      <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
        <Navbar openModal={openModal} />
        <Home openModal={openModal} />
        <Modal searchFriendModal={searchFriendModal} isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
      </div>
    </>
  )
}

export default App
