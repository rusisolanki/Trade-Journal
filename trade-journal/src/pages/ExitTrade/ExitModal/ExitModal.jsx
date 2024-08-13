import JournalModal from "../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/store";

const ExitModal = ({ showModal, setShowModal }) => {
  const [newExitTrade, setNewExitTrade] = useState({
    exit_date: null,
    exit_quantity: 0,
    exit_price: 0,
    charges: 0,
    trade_id: null,
  });
  const dispatch = useDispatch()
  const tradeID = useSelector(state => state.idReducer.tradeID)

  const changeHandler = (e) => {
    setNewExitTrade({
      ...newExitTrade,
      [e.target.name]: e.target.value,
      trade_id: tradeID,
    });

    console.log(newExitTrade);
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/exit/${tradeID}`,
        newExitTrade
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  };

  return (
    <JournalModal showModal={showModal}>
      <Modal.Header>
        <Modal.Title>Add Symbols</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Exit Date</Form.Label>
            <Form.Control
              type="date"
              name="exit_date"
              autoFocus
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="exit_quantity"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exit Price</Form.Label>
            <Form.Control
              type="number"
              name="exit_price"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
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
        <Button variant="secondary" onClick={() => dispatch(modalActions.change(false))}>
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Add
        </Button>
      </Modal.Footer>
    </JournalModal>
  );
};

ExitModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
}


export default ExitModal;
