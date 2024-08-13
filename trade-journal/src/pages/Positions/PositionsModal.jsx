import JournalModal from "../../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import PropTypes from "prop-types";

const PositionsModal = ({ showModal, setShowModal }) => {
  return (
    <JournalModal showModal={showModal}>
      <Modal.Header>
        <Modal.Title>Add Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Select</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>StopLoss</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Charges</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary">Add</Button>
      </Modal.Footer>
    </JournalModal>
  );
};

PositionsModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default PositionsModal;
