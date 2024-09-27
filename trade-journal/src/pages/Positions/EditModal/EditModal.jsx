import { useState } from "react";
import PropTypes from 'prop-types'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

const EditModal = ({edit, setEdit, tradeID}) => {
  const [currentStoploss, setCurrentStoploss] = useState(0);
  const changeHandler = (e) => {
    setCurrentStoploss(e.target.value)
  };

  const submitHandler = async () => {
    const current_stoploss = parseInt(currentStoploss)
    try {
      const response = await axios.post(`http://localhost:3000/trades/edit/${tradeID}`, {current_stoploss});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setEdit(false)
  };

  return (
    <Modal
        show={edit}
        onHide={() => setEdit(false)}
        backdrop="static"
        keyboard={false}
        scrollable
      >
      <Modal.Header>
        <Modal.Title>Change Stoploss</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Stoploss</Form.Label>
            <Form.Control
              type="number"
              name="current_stoploss"
              autoFocus
              onChange={changeHandler}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setEdit(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;

EditModal.propTypes = {
    edit: PropTypes.bool,
    setEdit: PropTypes.func,
    tradeID: PropTypes.number
}
