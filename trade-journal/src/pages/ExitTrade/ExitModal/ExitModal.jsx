import JournalModal from "../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/store";

const ExitModal = () => {
  const [exitDate, setExitDate] = useState(null);
  const [exitQuantity, setExitQuantity] = useState(null);
  const [exitPrice, setExitPrice] = useState(null);
  const [charges, setCharges] = useState(null);
  const dispatch = useDispatch();
  const tradeID = useSelector((state) => state.idReducer.tradeID);
  const tradeData = useSelector((state) => state.tradeReducer.trade);
  const journalType = localStorage.getItem('Type')

  const entryTrade = tradeData.filter((trade) => trade.id == tradeID);
  const days = Math.round(
    Math.abs(
      (new Date(entryTrade[0].date) - new Date(exitDate)) /
        (24 * 60 * 60 * 1000)
    )
  );

  const profit = journalType === 'Future' ? (
    (exitPrice - entryTrade[0].entry_price) *
    exitQuantity * entryTrade[0].lot_size
  ).toFixed(0) : ((exitPrice - entryTrade[0].entry_price) *
  exitQuantity).toFixed(0)

  

  const submitHandler = async () => {
    const updatedExitTrade = {
      exit_date: exitDate,
      exit_quantity: exitQuantity,
      exit_price: exitPrice,
      charges: charges,
      trade_id: tradeID,
      exit_days: days,
      profit: profit,
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/exit/${tradeID}`,
        updatedExitTrade
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(modalActions.change(false));
  };

  return (
    <JournalModal>
      <Modal.Header>
        <Modal.Title>Add Exit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Exit Date</Form.Label>
            <Form.Control
              type="date"
              name="exit_date"
              autoFocus
              onChange={(e) => setExitDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="exit_quantity"
              onChange={(e) => setExitQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exit Price</Form.Label>
            <Form.Control
              type="number"
              name="exit_price"
              onChange={(e) => setExitPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Charges</Form.Label>
            <Form.Control
              type="number"
              name="charges"
              onChange={(e) => setCharges(e.target.value)}
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

export default ExitModal;
