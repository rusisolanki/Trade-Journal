import Button from "react-bootstrap/esm/Button"
import classes from './JournalList.module.css'
import Container from "react-bootstrap/esm/Container"
import { useEffect } from "react"
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { idActions, journalActions } from "../../../store/store"
import { Link } from "react-router-dom"

const JournalList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchJournal = async () => {
            const journalData = await axios.get('http://localhost:3000/journal')
            dispatch(journalActions.change(journalData.data))
        }
        fetchJournal()
    }, [])
    const journals = useSelector(state => state.journalReducer.journal)
    const journalID = useSelector(state => state.idReducer.journalID)
    localStorage.setItem('JournalID', journalID)

  return (
    <>
    {journals.map(journal => (
        <Container key={journal.id} className={classes.list}>
        <div>
          <h3>
              {journal.name}
          </h3>
          <p>Type: {journal.type}</p>
        </div>
        <div>
        <Link to={`/${journal.id}/trades`}><Button className={classes.button} onClick={() => localStorage.setItem('JournalID', journal.id)}>Open</Button></Link>
        </div>
      </Container>
 ))}
    </>
  )
}

export default JournalList
