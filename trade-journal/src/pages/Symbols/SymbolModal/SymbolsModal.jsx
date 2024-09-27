import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import JournalModal from "../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { modalActions } from "../../../store/store";
import { useParams } from "react-router-dom";

const SymbolsModal = () => {
  const [newSymbol, setNewSymbol] = useState({
    symbol: "",
    name: "",
    sector: "",
    industry: "",
    lot_size: 0,
    journal_id: null,
  });
  const { id } = useParams();
  const journalType = localStorage.getItem('Type')

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setNewSymbol({
      ...newSymbol,
      [e.target.name]: e.target.value,
      journal_id: id,
    });
  };

  const submitHandler = async () => {
    console.log(newSymbol);
    try {
      const response = await axios.post(
        "http://localhost:3000/symbols",
        newSymbol
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
        <Modal.Title>Add Symbols</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              type="text"
              className="text-uppercase"
              name="symbol"
              onChange={changeHandler}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={changeHandler} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sector</Form.Label>
            <Form.Control type="text" name="sector" onChange={changeHandler} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Control
              type="text"
              name="industry"
              onChange={changeHandler}
            />
          </Form.Group>
          {journalType !== null && journalType === 'Future' && <Form.Group className="mb-3">
            <Form.Label>Lot Size</Form.Label>
            <Form.Control
              type="number"
              name="lot_size"
              onChange={changeHandler}
            />
          </Form.Group>}
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



export default SymbolsModal;
