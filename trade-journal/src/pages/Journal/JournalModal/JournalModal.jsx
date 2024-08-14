import JournalModal from "../../../components/Modal/Modal"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/store";
import { useState } from "react";
import axios from "axios";

const NewJournalModal = () => {
  const dispatch = useDispatch();
  const [journalData, setJournalData] = useState();

  const changeHandler = (e) => {
    setJournalData({
      ...journalData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/journal`,
        journalData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(modalActions.change(false));
  };

  return (
    <JournalModal>
      <Modal.Header>
        <Modal.Title>Add Journal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoFocus
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandler}
              name="type"
            >
              <option>Select</option>
              <option value="Income">Equity</option>
              <option value="Expense">Future</option>
            </Form.Select>
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

export default NewJournalModal;
