import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Journal.module.css";
import { LuPlus } from "react-icons/lu";
import Button from "react-bootstrap/esm/Button";
import JournalList from "./JournalList/JournalList";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";
import NewJournalModal from "./JournalModal/JournalModal";
import axios from "axios";
import { Link } from "react-router-dom";

function Journal() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  const user = localStorage.getItem('user')
  const logoutHandler = async () => {
    await axios.post('http://localhost:3000/authentication/logout')
    localStorage.removeItem('user')
  }
  return (
    <>
      <Navbar className={classes.nav}>
        <Container>
          <Navbar.Brand href="#">TradeJournal</Navbar.Brand>
          {user && 
          <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => dispatch(modalActions.change(true))}>
            <LuPlus fontSize="1.1em" />
            Add Journal
          </Button>
           <Link to='/authentication/login' className={classes.link}><Button className={classes.button} onClick={logoutHandler}>
            Logout
          </Button>
          </Link>
          </div>}
        </Container>
      </Navbar>
      <div>
        <JournalList />
      </div>
      {showModal && <NewJournalModal/>}
    </>
  );
}

export default Journal;
