import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"
import Modal from "./Components/Modal"
import { useState } from "react"

function App() {

  const [modalIn, setModalIn] = useState(false)
  const [modalForm, setModalForm] = useState(false)

  const openModal = () => {
    setModalIn(true)
  }

  const closeModal = () => {
    setModalIn(false)
  }

  const switchModal = () => {
    setModalForm(prevModalForm => !prevModalForm)
  }

  return (
    <>
      <Layout />
      <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
        <Navbar openModal={openModal} />
        <Home />
        <Modal isRegisterForm={modalForm} modalIn={modalIn} closeModal={closeModal} switchModal={switchModal} />
      </div>
    </>
  )
}

export default App
