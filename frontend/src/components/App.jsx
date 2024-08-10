import { Outlet } from "react-router-dom"
// import Body from "./Body/Body.jsx"
// import Footer from "./Footer/Footer.jsx"
// import Header from "./Header/Header.jsx"
// No need currently

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Outlet/>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop
        theme="light"
      />
    </>
  )
}

export default App
