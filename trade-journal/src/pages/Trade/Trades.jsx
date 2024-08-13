import { lazy, Suspense } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { LuPlus } from "react-icons/lu";
import { PiExport } from "react-icons/pi";
import Button from "react-bootstrap/esm/Button";
import classes from "./Trade.module.css";
import Container from "react-bootstrap/esm/Container";
import TradeModal from "./TradeModal/TradeModal";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";

const TradeTable = lazy(() =>
  import("./TradeTable/TradeTable")
);

const Trades = () => {
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
            New Trade
          </Button>
          <Button className={classes.button}>
            <PiExport fontSize="1.1em" />
            Export
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <TradeTable />
          </Suspense>
        </div>
      </Container>
      {showModal && (
        <TradeModal />
      )}
    </div>
  );
};

export default Trades;
