import { useEffect, lazy, Suspense } from "react";
import Button from "react-bootstrap/esm/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import classes from "./Symbols.module.css";
import Container from "react-bootstrap/esm/Container";
import { LuPlus } from "react-icons/lu";
import SymbolsModal from "./SymbolModal/SymbolsModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, symbolActions } from "../../store/store";

const SymbolTable = lazy(() =>
  import("./SymbolTable/SymbolTable")
);

const Symbols = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modalReducer.showModal)
  const symbol = useSelector(state => state.symbolReducer.symbol)

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/symbols");
        const symbolData = response.data;
        dispatch(symbolActions.change(symbolData))
      } catch (error) {
        console.log(error);
      }
    };

    fetchTradeData();
  }, [symbol]);

  
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
      <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => dispatch(modalActions.change(true))}>
            <LuPlus fontSize="1.1em" />
            Add Symbol
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <SymbolTable />
          </Suspense>
        </div>
      </Container>
      {showModal && <SymbolsModal />}
    </div>
  );
};

export default Symbols;
