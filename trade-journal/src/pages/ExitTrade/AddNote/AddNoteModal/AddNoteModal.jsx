import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import JournalModal from "../../../../components/Modal/Modal";
import { modalActions } from "../../../../store/store";

const AddNoteModal = () => {
  const [newNote, setNewNote] = useState({
    note: '',
    note_date: null,
    trade_id: null
  });
  const dispatch = useDispatch()
  const tradeID = useSelector(state => state.idReducer.tradeID)

  const changeHandler = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
      note_date: new Date().toLocaleString('en-CA', {day:'2-digit', month: '2-digit', year: 'numeric'}),
      trade_id: tradeID,
    });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/add-note/${tradeID}`,
        newNote
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(modalActions.change(false))
  };

  return (
    <JournalModal>
      <Modal.Header>
        <Modal.Title>Add Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add Note</Form.Label>
            <Form.Control
              type="text"
              name="note"
              autoFocus
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


export default AddNoteModal;
