import { useEffect } from "react";
import JournalTables from "../../../components/Table/JournalTables";
import classes from './ExitTable.module.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { exitTradeActions } from "../../../store/store";
import { headings } from "../../../constants/constants";

const ExitTable = () => {
  const dispatch = useDispatch()
  const tradeData = useSelector(state => state.tradeReducer.trade)
  const exitTradeData = useSelector(state => state.exitTradeReducer.exitTrade)
  const tradeID = useSelector(state => state.idReducer.tradeID)
  
  const entryTrade = tradeData.filter(trade => trade.id == tradeID)


  useEffect(() => {
    const fetchExitTrade= async() => {
      const exitTrade = await axios.get(`http://localhost:3000/exit/${tradeID}`)
      dispatch(exitTradeActions.change(exitTrade.data))
    }
    fetchExitTrade()
  }, [exitTradeData])


  return (
    <>
      <JournalTables>
        <thead>
          <tr>
          {headings.entry.map(((heading, index) => (
            <th key={index} className={classes.heading}>{heading}</th>
          )))} 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{new Date(entryTrade[0].date).toLocaleString("en-IN", {day:'2-digit', month: 'short', year: 'numeric'})}</td>
            <td>{entryTrade[0].entry_price}</td>
            <td>{entryTrade[0].quantity}</td>
            <td>{entryTrade[0].stoploss}</td>
          </tr>
        </tbody>
      </JournalTables>
      <JournalTables>
        <thead>
        {headings.exit.map(((heading, index) => (
            <th key={index} className={classes.heading}>{heading}</th>
          )))} 
        </thead>
        <tbody>
          {exitTradeData?.map((exitTrade) => (
            <tr key={exitTrade.id}>
            <td>{new Date(exitTrade.exit_date).toLocaleString("en-IN", {day:'2-digit', month: 'short', year: 'numeric'})}</td>
            <td>{exitTrade.exit_quantity}</td>
            <td>{exitTrade.exit_price}</td>
          </tr>
          ))}
          
        </tbody>
      </JournalTables>
    </>
  );
};

export default ExitTable;
