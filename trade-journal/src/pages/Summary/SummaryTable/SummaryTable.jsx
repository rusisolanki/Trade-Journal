import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Monthly from '../Tabs/MonthlySummary/Monthly';
import Quarterly from '../Tabs/QuarterlySummary/Quarterly';
import Yearly from '../Tabs/YearlySummary/Yearly';

const SummaryTable = () => {
  const [key, setKey] = useState("monthly");
  return (
    <Tabs
      id="uncontrolled-tab-example"
      activeKey={key}
      className="mb-3"
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="monthly" title="Monthly">
        <Monthly/>
      </Tab>
      <Tab eventKey="quarterly" title="Quarterly">
        <Quarterly/>
      </Tab>
      <Tab eventKey="yearly" title="Yearly">
        <Yearly/>
      </Tab>
    </Tabs>
  )
}

export default SummaryTable
