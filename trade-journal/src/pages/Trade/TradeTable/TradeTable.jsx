import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import JournalTables from "../../../components/Table/JournalTables";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { headings } from "../../../constants/constants";
import { idActions, tradeActions } from "../../../store/store";
import classes from "./TradeTable.module.css";

const TradeTable = () => {
  const dispatch = useDispatch()
  const tradeData = useSelector(state => state.tradeReducer.trade)
  const journalType = localStorage.getItem('Type')
  const {id} = useParams()
  

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/trades/${id}`);
        const tradeData = response.data;
        // debugger
        dispatch(tradeActions.change(tradeData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTradeData();
  }, [tradeData]);


  return (
    <>
    {tradeData.length > 0 ? 
    <JournalTables>
      <thead>
        <tr>
          {journalType !== null && journalType === 'Future' ? headings.futureTrade.map((heading, index) => (
            <th key={index} className={classes.heading}>
              {heading}
            </th>
          )) : headings.equityTrade.map((heading, index) => (
            <th key={index} className={classes.heading}>
              {heading}
            </th>
          ))}     
        </tr>
      </thead>
      <tbody>
        {tradeData.map((trade, index) => (
          <tr key={trade.id}>
            <td> <Link to={`/${id}/exit/${trade.id}`}><Button className={classes.button} onClick={() => dispatch(idActions.changeTrade(trade.id))}>{index+1}</Button></Link></td>
            <td>{new Date(trade.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</td>
            <td>{trade.totalProfit - trade.totalCharges !== 0 ? (trade.totalProfit - trade.totalCharges < 0 ? <span className={classes.minus}>{trade.symbol}</span> : <span className={classes.plus}>{trade.symbol}</span>) : trade.symbol}</td>
            <td>{trade.quantity}</td>
            {journalType !== null && journalType === 'Future' && <td> {new Date(trade.expiry_date).toLocaleDateString('en-us', { year:"numeric", month:"short"})}</td>}
            {journalType !== null && journalType === 'Future' && <td>{trade.lot_size}</td>}
            <td>{trade.entry_price}</td>
            <td>{trade.stoploss}</td>
            <td>{(((trade.entry_price - trade.stoploss)/trade.entry_price) * 100).toFixed(2)}%</td>
            <td>{journalType === 'Future' ? (trade.entry_price * trade.quantity * trade.lot_size).toFixed(2) : (trade.entry_price * trade.quantity).toFixed(2)}</td>
            <td>{((trade.entry_price * trade.quantity) / trade.account_value).toFixed(2)}%</td>
            <td>{(trade.quantity * (trade.entry_price - trade.stoploss)).toFixed(2)}</td>
            <td>{(((trade.quantity * (trade.entry_price - trade.stoploss)) / trade.account_value) * 100).toFixed(2)}%</td>
            <td>{trade.totalQuantity ? (trade.quantity / trade.totalQuantity).toFixed(2): 'N/A'}</td>
            <td>{trade.exit_price ? trade.exit_price : 'N/A'}</td>
            <td>{trade.exit_price ? ((trade.exit_price - trade.entry_price)/trade.entry_price).toFixed(2) : 'N/A'}</td>
            <td>{trade.capital}</td>
            <td>{trade.totalProfit === 0 ? 'N/A' : ((trade.totalProfit / trade.capital) * 100).toFixed(2)}%</td>
            <td>{trade.capital}</td>
            <td>{((trade.totalProfit / trade.capital) * 100).toFixed(2)}%</td>
            <td>{trade.account_value}</td>
            <td>{((trade.totalProfit / trade.account_value) * 100).toFixed(2)}%</td>
            <td>{trade.totalDays ? trade.totalDays : 0}</td>
            <td>{(trade.totalProfit / (trade.entry_price * trade.quantity)).toFixed(1)}R</td>
            <td>{trade.totalProfit - trade.totalCharges !== 0 ? (trade.totalProfit - trade.totalCharges < 0 ? <span className={classes.minus}>{trade.totalProfit - trade.totalCharges}</span> : <span className={classes.plus}>{trade.totalProfit - trade.totalCharges}</span>) : 0}</td>
          </tr>
        ))}

      </tbody>
    </JournalTables>
    : (
      <div className={classes.addJournal}>
        <h2>Add a new trade</h2>
        <p className={classes.note}>NOTE: Add funds before you add a trade</p>
      </div>
    )}
    </>
  );
};


export default TradeTable;
