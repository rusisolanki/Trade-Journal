import NavigationBar from "../../components/NavigationBar/NavigationBar";
import JournalTables from "../../components/Table/JournalTables";
import classes from "./Summary.module.css";
import Container from "react-bootstrap/esm/Container";

const Summary = () => {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
        <div>
          <JournalTables />
        </div>
      </Container>
    </div>
  );
};

export default Summary;
