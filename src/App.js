

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { AppBar, Button, Toolbar } from '@mui/material';
import Bookstore from './Components/Bookstore';

function App() {
  return (
    <Router>
      <AppBar>
        <Toolbar sx={{ justifyContent: "end" }}>

          <Button variant='contained' sx={{ background: "#fff" }}>
            <Link to="/signup" style={{ color: "#000", textDecoration: "none" }}>Signup</Link>
          </Button>
          &nbsp;&nbsp;

          <Button variant='contained' sx={{ background: "#fff" }}>
            <Link to="/login" style={{ color: "#000", textDecoration: "none" }}>Login</Link>
          </Button>

        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookstore" element={<Bookstore />} />
      </Routes>
    </Router>
  );
}

export default App;
