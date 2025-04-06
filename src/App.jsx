import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Home from "./pages/Home";
import Registration from "./pages/Registration"
import { BrowserRouter, Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import RootLayout from "./components/RootLayout";

function App() {

  return (
    <>
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
