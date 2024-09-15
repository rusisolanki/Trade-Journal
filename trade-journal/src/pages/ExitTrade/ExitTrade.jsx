import { Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import classes from './ExitTrade.module.css'
import { LuPlus } from "react-icons/lu";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ExitModal from "./ExitModal/ExitModal";
import { modalActions } from "../../store/store";
import AddNote from "./AddNote/AddNote";
import AddNoteModal from "./AddNote/AddNoteModal/AddNoteModal";

const ExitTable = lazy(() =>
  import("./ExitTable/ExitTable")
);

const ExitTrade = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  const [modalOption, setModalOption] = useState(true)

  const exitTradeButton = () => {
    setModalOption(false)
    dispatch(modalActions.change(true))
  }
  const addNoteButton = () => {
    setModalOption(true)
    dispatch(modalActions.change(true))
  }

  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={exitTradeButton}>
            <LuPlus fontSize="1.1em" />
            Exit Trade
          </Button>
          <Button className={classes.button} onClick={addNoteButton}>
            <LuPlus fontSize="1.1em" />
            Add Note
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ExitTable />
          </Suspense>
        </div>
        <div>
          <AddNote/>
        </div>
      </Container>
      {showModal ? (modalOption ?
        <AddNoteModal /> : <ExitModal/>) : '' }
    </div>
  );
};

export default ExitTrade;
