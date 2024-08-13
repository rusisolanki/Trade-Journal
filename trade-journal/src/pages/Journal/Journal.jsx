import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Journal.module.css";
import { LuPlus } from "react-icons/lu";
import Button from "react-bootstrap/esm/Button";
import JournalList from "./JournalList/JournalList";
import { useDispatch } from "react-redux";
import { modalActions } from "../../store/store";

function Journal() {
  const dispatch = useDispatch()
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
    </>
  );
}

export default Journal;
