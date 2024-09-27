import { lazy, Suspense } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Container from "react-bootstrap/esm/Container";
import classes from "./Summary.module.css";
const SummaryTable = lazy(() => import("./SummaryTable/SummaryTable"));

const Summary = () => {
 
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <SummaryTable/>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Summary;
