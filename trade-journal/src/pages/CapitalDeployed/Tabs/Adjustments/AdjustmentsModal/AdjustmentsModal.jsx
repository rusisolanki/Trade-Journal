import JournalModal from "../../../../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../../store/store";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdjustmentsModal = () => {
  const dispatch = useDispatch();
  const [adjustmentsData, setAdjustmentsData] = useState();
  const { id } = useParams()

  const changeHandler = (e) => {
    setAdjustmentsData({
      ...adjustmentsData,
      [e.target.name]: e.target.value,
      journal_id: id
    });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/capital-deployed/adjustment`,
        adjustmentsData
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
        <Modal.Title>Add Adjustments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="adjustments_date"
              autoFocus
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={changeHandler}
              name="adjustments_type"
            >
              <option>Select</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="adjustments_amount"
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

export default AdjustmentsModal;
