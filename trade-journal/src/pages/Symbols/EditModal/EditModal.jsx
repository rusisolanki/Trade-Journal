import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

const EditModal = ({edit, setEdit, symbolID}) => {
  const [lotSize, setLotSize] = useState(0)
  const submitHandler = async () => {
    const lot_size = parseInt(lotSize)
    try {
      const response = await axios.post(`http://localhost:3000/symbols/edit/${symbolID}`, {lot_size});
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
    scrollable>
      <Modal.Header>
        <Modal.Title>Change Lot Size</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Lot Size</Form.Label>
            <Form.Control
              type="number"
              name="lot_size"
              onChange={(e) => setLotSize(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setEdit(false)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditModal.propTypes = {
    edit: PropTypes.bool,
    setEdit: PropTypes.func,
    symbolID: PropTypes.number
}

export default EditModal;
