import React, {useState, useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';

function Navbari (){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
      <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand>MoviesApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Trending</Nav.Link>
          <Nav.Link href="#features">Genres</Nav.Link>
        </Nav>   
        <Nav className="login-button">
          <Button onClick={handleShow}>
            Login
          </Button>                     
        </Nav>
      </Navbar>
      <Modal show={show} onHide={handleClose}
             animation={true}
             className = "fadeInDown"
             transparent = {true}
             aria-labelledby="example-custom-modal-styling-title">
               <Modal.Body className="mesi">
               <Login/>

               </Modal.Body>
      </Modal>
      </>
    );
}

export default Navbari;