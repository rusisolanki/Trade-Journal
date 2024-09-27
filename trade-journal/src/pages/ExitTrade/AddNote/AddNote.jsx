import Container from "react-bootstrap/esm/Container";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import classes from "./AddNote.module.css";
import { noteActions } from "../../../store/store";

const AddNote = () => {
  const dispatch = useDispatch();
  const tradeID = useSelector((state) => state.idReducer.tradeID);
  const notes = useSelector((state) => state.noteReducer.note)
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/add-note/${tradeID}`
        );
        
        const noteData = response.data;
        dispatch(noteActions.change(noteData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
  }, [notes]);
  return (
    <>
    {notes.length > 0 && 
    (<Container className={classes.list}>
      <h3>Notes</h3>
      <div className={classes.notesList}>
        {notes.map((note) => (
            <div key={note.id} className={classes.notes}>
          <h5>{note.note}</h5>
          <p>{new Date(note.note_date).toLocaleString('en-IN', {day:'2-digit', month:'short', year:'numeric'})}</p>
        </div>
        ))}
      </div>
    </Container>)
}
    </>
  );
};

export default AddNote;
