import React from 'react';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Login from './Login';
=======
>>>>>>> master
import Header from './containers/Header.jsx';
import SearchBar from './containers/SearchBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MainGallery from './containers/MainGallery.jsx';
import Footer from './containers/Footer.jsx';
import { Container, Row, Col } from 'react-bootstrap'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false) // determines if logged in

  // Checks if user is valid and logged in
  async function checkCookie(){
    console.log('checking the cookie')

    await fetch('/api/login')
      .then(data => data.json())
      .then(data => {
        if (data === true) setIsLoggedIn(true)
      })
      .catch(err => console.log('err', err))
  };
  checkCookie();

  // LOG USER OUT
  function logOut() {
    setIsLoggedIn(false)
  };
    
  return (
    <div id='App'>
<<<<<<< HEAD
      {!isLoggedIn &&
      <Login />
      }
      {isLoggedIn && 
=======
>>>>>>> master
      <Container fluid>
        <a href="/api/logout">
          <button onClick={logOut}>Log Out</button>
        </a>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <SearchBar /> */}
          </Col>
        </Row>
        <Row>
          <Col sm={3} xl={2}>
            <SideBar />
          </Col>
          <Col sm={9} xl={10}>
            <MainGallery />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <Footer /> */}
          </Col>
        </Row>
      </Container>
      }
    </div>
  );
}

export default App;