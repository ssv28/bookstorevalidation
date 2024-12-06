// import Login from './Components/Login';
// import Signup from './Components/Signup';

// function App() {
//   return (
//     <div className="App">

//       <Signup></Signup>
//       <Login></Login>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

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
      </Routes>
    </Router>
  );
}

export default App;
