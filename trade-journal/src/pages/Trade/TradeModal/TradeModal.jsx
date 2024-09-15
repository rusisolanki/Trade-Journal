import JournalModal from "../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/store";

const TradeModal = () => {
  //Adding a new state to pass to the backend
  const [newTrade, setNewTrade] = useState({
    date: null,
    quantity: 0,
    type: "",
    entry_price: 0,
    stoploss: 0,
    current_stoploss: 0,
    charges: 0,
    capital: 0,
    account_value: 0,
    expiry_date: null,
    symbol_id: null,
    journal_id: null,
  });
  const [stopLoss, setStopLoss] = useState(0)
  let totalFunds = 0;
  const dispatch = useDispatch();
  const [symbolList, setSymbolList] = useState([]);
  const [fundsList, setFundsList] = useState([]);
  const { id } = useParams(); //Accessing the journal id from the url
  const trades = useSelector((state => state.tradeReducer.trade))
  const journalType = localStorage.getItem('Type')
  

  // Calculating profits of all the trades in order to calculate account value
  const totalTradeProfit = trades.reduce((sum, trade) => {
    return sum += (trade.totalProfit - trade.totalCharges)
  }, 0)
  
  // Fetching symbols to add in the dropdown list of selecting symbols
  useEffect(() => {
    const symbolHandler = async () => {
      const list = await axios.get("http://localhost:3000/symbols/symbols");
      setSymbolList(list.data);
    };
    symbolHandler();
  }, []);

  useEffect(() => {
    const fundsHandler = async () => {
      const list = await axios.get(`http://localhost:3000/capital-deployed/${id}`);
      setFundsList(list.data[0])
      console.log(list.data[0])
    };
    fundsHandler();
  }, []);

  const changeHandler = (e) => {
    // Getting the total funds in order to add value in the 'capital' column
    for (let i = 0; i < fundsList.length; i++) {
      if (fundsList[i].funds_type === "Deposit") {
        totalFunds += fundsList[i].funds_amount;
      }
      if (fundsList[i].funds_type === "Withdraw") {
        totalFunds -= fundsList[i].funds_amount;
      }
    }

    setNewTrade({
      ...newTrade,
      [e.target.name]: e.target.value,
      stoploss: stopLoss,
      current_stoploss: stopLoss,
      journal_id: id,
      capital: totalFunds,
      account_value: totalFunds + totalTradeProfit
    });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/trades",
        newTrade
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(modalActions.change(false));
  };

  return (
    <JournalModal>
      <Modal.Header>
        <Modal.Title>Add Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Symbol</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandler}
              name="symbol_id"
            >
              <option>Select</option>
              {symbolList.map((symbol) => (
                <option value={symbol.id} key={symbol.id}>
                  {symbol.symbol}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={changeHandler}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              onChange={changeHandler}
            />
          </Form.Group>
          {journalType !== null && journalType === 'Future' && <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              name="expiry_date"
              onChange={changeHandler}
              autoFocus
            />
          </Form.Group>}
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandler}
              name="type"
            >
              <option>Select</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Entry Price</Form.Label>
            <Form.Control
              type="number"
              name="entry_price"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>StopLoss</Form.Label>
            <Form.Control
              type="number"
              name="stoploss"
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Charges</Form.Label>
            <Form.Control
              type="number"
              name="charges"
              onChange={changeHandler}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(modalActions.change(false))}
        >
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Add
        </Button>
      </Modal.Footer>
    </JournalModal>
  );
};

export default TradeModal;
