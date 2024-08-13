import { Suspense, lazy } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import classes from './ExitTrade.module.css'
import { LuPlus } from "react-icons/lu";
import ExitModal from "./ExitModal/ExitModal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";

const ExitTable = lazy(() =>
  import("./ExitTable/ExitTable")
);

const ExitTrade = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => dispatch(modalActions.change(true))}>
            <LuPlus fontSize="1.1em" />
            Exit Trade
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ExitTable />
          </Suspense>
        </div>
      </Container>
      {showModal && (
        <ExitModal />
      )}
    </div>
  );
};

export default ExitTrade;
