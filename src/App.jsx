import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Registration from "./pages/Registration"
import { BrowserRouter, Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import RootLayout from "./components/RootLayout";
import { ToastContainer, toast, Bounce } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <BrowserRouter>
        <Routes>

          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<RootLayout />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
