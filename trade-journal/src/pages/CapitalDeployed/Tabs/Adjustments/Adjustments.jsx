import JournalTables from "../../../../components/Table/JournalTables";
import classes from './Adjustments.module.css'
import { headings } from "../../../../constants/constants";
import { useSelector } from "react-redux";

const Adjustments = () => {
  const adjustments = useSelector((state) => state.adjustmentReducer.adjustment)
  // console.log(adjustments[0].adjust)
  return (
    <JournalTables>
      <thead>
      <tr >
        {headings.adjustments.map((fund, index) => (
            <th key={index} className={classes.heading}>{fund}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {adjustments.map(adjustment => (
            <tr key={adjustment.id}>
                <td>{new Date(adjustment.adjustments_date).toLocaleString('en-IN', {year:"numeric", month:"short", day:"numeric"})}</td>
                <td>{adjustment.adjustments_type}</td>
                <td>{adjustment.adjustments_amount}</td>
            </tr>
        ))}
      </tbody>
    </JournalTables>
  )
}

export default Adjustments