import { useState } from 'react';
import PropTypes from 'prop-types'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Funds from '../Tabs/Funds/Funds';
import Adjustments from '../Tabs/Adjustments/Adjustments';
// import { Link } from 'react-router-dom';

const CapitalTable = ({ onSelectingTab }) => {
  const [key, setKey] = useState("funds");
  onSelectingTab(key)
  return (
    <Tabs
      id="uncontrolled-tab-example"
      activeKey={key}
      className="mb-3"
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="funds" title="Funds">
        <Funds/>
      </Tab>
      <Tab eventKey="adjustments" title="Adjustments">
        <Adjustments/>
      </Tab>
    </Tabs>
  )
}

CapitalTable.propTypes = {
  onSelectingTab: PropTypes.func,
}

export default CapitalTable
