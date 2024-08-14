import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Journal.module.css";
import { LuPlus } from "react-icons/lu";
import Button from "react-bootstrap/esm/Button";
import JournalList from "./JournalList/JournalList";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";
import NewJournalModal from "./JournalModal/JournalModal";

function Journal() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">TradeJournal</Navbar.Brand>
          <Button className={classes.button} onClick={() => dispatch(modalActions.change(true))}>
            <LuPlus fontSize="1.1em" />
            Add Journal
          </Button>
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
