import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <>
      <Layout />
      <div className=" absolute top-0 left-0 box-border h-dvh w-dvw">
        <Navbar />
        <Home />
      </div>
    </>
  )
}

export default App
