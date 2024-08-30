import './App.css';
import Homepage from "./Components/homepage/homepage.js";
import Login from "./Components/login/login.js";
import Register from "./Components/register/register.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState(null); 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
