import { lazy, Suspense, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Container from "react-bootstrap/esm/Container";
import classes from "./CapitalDeployed.module.css";
import Button from "react-bootstrap/esm/Button";
import { LuPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/store";
// import FundsModal from "./Tabs/Funds/FundsModal/FundsModal";
// import AdjustmentsModal from "./Tabs/Adjustments/AdjustmentsModal/AdjustmentsModal";
const CapitalTable = lazy(() => import("./CapitalDeployedTable/CapitalTable"));

const CapitalDeployed = () => {
  const [selectedTab, setSelectedTab] = useState("funds")
  const dispatch = useDispatch()
  // const showModal = useSelector(state => state.modalReducer.showModal)
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <Container className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={() => dispatch(modalActions.change(true))}>
            <LuPlus fontSize="1.1em" />
            {selectedTab === 'funds' ? 'Add Funds' : 'Add Adjustments'}
          </Button>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <CapitalTable onSelectingTab={setSelectedTab}/>
          </Suspense>
        </div>
      </Container>
      {/* {showModal ? (selectedTab === 'funds' ? <FundsModal/> : <AdjustmentsModal/>) : ''} */}
    </div>
  );
};

export default CapitalDeployed;
