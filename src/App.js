import { BrowserRouter, Routes ,Route,  } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import {Container} from "@mui/material";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {

  const {authIsReady,user}=useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
            <BrowserRouter>
            <Navbar/>
              <Container>
                <Routes>
                  <Route path="/" element={user ? <Home/> : <Login/>}/>
                  <Route path="/login" element={!user ? <Login/> : <Home/>}/>
                  <Route path="/signup" element={!user ? <Signup/> : <Home/>}/>
                </Routes>
              </Container>
          </BrowserRouter>
      )}
    </div>
  );
}

export default App;
