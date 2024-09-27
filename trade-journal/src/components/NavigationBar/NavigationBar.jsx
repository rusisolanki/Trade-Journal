import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css'
import axios from 'axios';


function NavigationBar() {
  const journalID = localStorage.getItem('JournalID')
  const user = JSON.parse(localStorage.getItem('user'))

  const logoutHandler = async () => {
    await axios.post('http://localhost:3000/authentication/logout')
    localStorage.removeItem('user')
    localStorage.removeItem('JournalID')
  }

  return (
    <>
      <Navbar className={classes.nav}>
        <Container>
          <Navbar.Brand as={NavLink} to={`/${user.id}/`}>TradeJournal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={`/${journalID}/trades`}>Trades</Nav.Link>
            <Nav.Link as={NavLink} to={`/${journalID}/positions`}>Positions</Nav.Link>
           <Nav.Link as={NavLink} to={`/${journalID}/summary`}>Summary</Nav.Link>
            <Nav.Link as={NavLink} to={`/${journalID}/capital-deployed`}>Capital Deployed</Nav.Link>
            <Nav.Link as={NavLink} to={`/${journalID}/symbols`}>Symbols</Nav.Link>
          </Nav>
        </Container>
       <Link to='/authentication/login' className={classes.link}><Button className={classes.button} onClick={logoutHandler}>Logout</Button></Link>
      </Navbar>
    </>
  )}

export default NavigationBar
