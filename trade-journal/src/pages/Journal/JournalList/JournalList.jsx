import Button from "react-bootstrap/esm/Button";
import classes from "./JournalList.module.css";
import Container from "react-bootstrap/esm/Container";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { journalActions } from "../../../store/store";
import { Link } from "react-router-dom";

const JournalList = () => {
  const dispatch = useDispatch();
  const journals = useSelector((state) => state.journalReducer.journal);
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const fetchJournal = async () => {
      const journalData = await axios.get(`http://localhost:3000/journal/${user.id}`);
      dispatch(journalActions.change(journalData.data));
    };
    
    fetchJournal();
  }, [dispatch, user.id, journals]);

  

  return (
    <>
      {journals.length !== 0 ? journals.map((journal) => (
        <Container key={journal.id} className={classes.list}>
          <div>
            <h4>{journal.name}</h4>
            <p>Type: {journal.type}</p>
          </div>
          <div>
            <Link to={`/${journal.id}/trades`}>
              <Button
                className={classes.button}
                onClick={() => {localStorage.setItem("JournalID", journal.id); localStorage.setItem('Type', journal.type)}}
              >
                Open
              </Button>
            </Link>
          </div>
        </Container>
      )) : (
        <Container className={classes.addJournal}>
          <h2>Add a new Journal</h2>
        </Container>
      )}
    </>
  );
};

export default JournalList;
