import Table from "react-bootstrap/Table";
import classes from './JournalTables.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'


function JournalTables({children}) {
  
  return (
      <Table hover responsive className={classes.table} >
        {children}
      </Table>
  );
}

JournalTables.propTypes = {
  children: PropTypes.array
}

export default JournalTables;
