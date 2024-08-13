import JournalTables from "../../../../components/Table/JournalTables";
import classes from './Funds.module.css'
import { headings } from "../../../../constants/constants";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adjustmentActions, fundActions } from "../../../../store/store";
import { useParams } from "react-router-dom";

const Funds = () => {
  const dispatch = useDispatch()
  const funds = useSelector(state => state.fundReducer.fund)
  const adjustments = useSelector(state => state.adjustmentReducer.adjustment)
  const { id } = useParams()
  useEffect(() => {
    const fetchFundsData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/capital-deployed/${id}`);
        const capitalData = response.data;
        // console.log(capitalData)
        // debugger
        dispatch(fundActions.change(capitalData[0]));
        dispatch(adjustmentActions.change(capitalData[1]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFundsData();
  }, [funds, adjustments]);
  
  

  return (
    <JournalTables>
      <thead>
      <tr >
        {headings.capital.map((fund, index) => (
            <th key={index} className={classes.heading}>{fund}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {funds.map(fund => (
            <tr key={fund?.id}>
                <td>{new Date(fund?.funds_date).toLocaleString('en-IN', { year:"numeric", month:"short", day:"numeric"})}</td>
                <td>{fund?.funds_type}</td>
                <td>{fund?.funds_amount}</td>
            </tr>
        ))}
      </tbody>
    </JournalTables>
  )
}

export default Funds
