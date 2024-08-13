import { useState, useEffect, lazy, Suspense } from "react";
import Button from "react-bootstrap/esm/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import classes from "./Positions.module.css";
import Container from "react-bootstrap/esm/Container";
import { LuPlus } from "react-icons/lu";
import TradeModal from "../Trade/TradeModal/TradeModal";
import axios from "axios";

const TradeTable = lazy(() =>
  import("../Trade/TradeTable/TradeTable")
);

const Positions = () => {
  const [showModal, setShowModal] = useState(false)
  const [totalTrades, setTotalTrades] = useState([]);

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/trades");
        const tradeData = response.data;
        // dispatch(tradeActions.change(tradeData));
        setTotalTrades(tradeData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTradeData();
  }, [totalTrades]);

  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
      <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => setShowModal(true)}>
            <LuPlus fontSize="1.1em" />
            New Trade
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <TradeTable totalTrades={totalTrades} />
          </Suspense>
        </div>
      </Container>
      {showModal && <TradeModal setShowModal={setShowModal} showModal={showModal}/>}
    </div>
  );
};

export default Positions;
