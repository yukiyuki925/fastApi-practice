import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import LoginFailed from "./components/pages/LoginFailed";
import NotFound from "./components/pages/NotFound";
import Register from "./components/pages/Register";
import LoginUserProvider from "./components/providers/LoginUserProvider";

function App() {
  return (
    <LoginUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginfailed" element={<LoginFailed />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </LoginUserProvider>
  );
}

export default App;
