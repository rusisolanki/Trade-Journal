import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function NavigationBar() {
  // const journalID = useSelector(state => state.idReducer.journalID)
  const journalID = localStorage.getItem('JournalID')
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" as={Link} to='/'>TradeJournal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${journalID}/trades`}>Trades</Nav.Link>
            <Nav.Link as={Link} to={`/${journalID}/positions`}>Positions</Nav.Link>
           <Nav.Link as={Link} to={`/${journalID}/summary`}>Summary</Nav.Link>
            <Nav.Link as={Link} to={`/${journalID}/capital-deployed`}>Capital Deployed</Nav.Link>
            <Nav.Link as={Link} to={`/${journalID}/symbols`}>Symbols</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )}

export default NavigationBar
