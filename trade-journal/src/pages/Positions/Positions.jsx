import {lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Container from "react-bootstrap/esm/Container";
import { LuPlus } from "react-icons/lu";
import TradeModal from "../Trade/TradeModal/TradeModal";
import { modalActions } from "../../store/store";
const PositionsTable = lazy(() => 
  import('../Positions/PositionsTable/PositionsTable')
)
import classes from "./Positions.module.css";


const Positions = () => {
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
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <PositionsTable />
          </Suspense>
        </div>
      </Container>
      {showModal && <TradeModal/>}
    </div>
  );
};

export default Positions;
