import Table from "react-bootstrap/Table";
import classes from './JournalTables.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'
// import { useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { tradeActions } from "../../store/store";


function JournalTables({children}) {
  // const tableRef = useRef(null)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(tradeActions.changeTableRef(tableRef.current))
  // }, [])
  return (
      <Table bordered hover responsive className={classes.table}>
        {children}
      </Table>
  );
}

JournalTables.propTypes = {
  children: PropTypes.array
}

export default JournalTables;
