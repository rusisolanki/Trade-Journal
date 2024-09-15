import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import JournalTables from "../../../components/Table/JournalTables";
import { headings } from "../../../constants/constants";
import { idActions, positionActions, tradeActions } from "../../../store/store";
import classes from "./PositionsTable.module.css";
import EditModal from "../EditModal/EditModal";


const PositionsTable = () => {
  const [edit, setEdit] = useState(false)
  const [tradeID, setTradeID] = useState(null)
  const {id} = useParams()
  const dispatch = useDispatch()
  const positionsData = useSelector(state => state.positionReducer.position)

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/trades/${id}`);
        const trades = response.data;
        dispatch(tradeActions.change(trades))
        const filteredTrades = trades.filter(trade => trade.quantity > trade.totalQuantity)
        dispatch(positionActions.change(filteredTrades));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTradeData();
    // console.log(positionsData)
  }, []);

  const totalExposure = positionsData.reduce((sum, trade) => {
    return sum += (trade.quantity * trade.entry_price)
  }, 0)
  const totalOpenRisk = positionsData.reduce((sum, trade) => {
    return sum += (((trade.entry_price - trade.stoploss) * trade.quantity))
  }, 0)

  return (
    <>
    <div className={classes.positionSummary}>
      <div className={classes.container}>
        <h6>Total Open Trades</h6>
        <p className={classes.data}>{positionsData.length}</p>
      </div>
      <div className={classes.container}>
        <h6>Exposure</h6>
        <p className={classes.data}>{totalExposure}</p>
      </div>
      <div className={classes.container}>
        <h6>Total Open Risk</h6>
        <p className={classes.data}>{totalOpenRisk}</p>
      </div>
    </div>

    <JournalTables>
      <thead>
        <tr>
          {headings.positions.map((heading, index) => (
            <th key={index} className={classes.heading}>
              {heading}
            </th>
          ))}     
        </tr>
      </thead>
      <tbody>
        {positionsData.map((trade, index) => (
          <tr key={trade.id}>
            <td> <Link to={`/${id}/exit/${trade.id}`}><Button className={classes.button} onClick={() => dispatch(idActions.changeTrade(trade.id))}>{index+1}</Button></Link></td>
            <td>{new Date(trade.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</td>
            <td>{trade.totalProfit - trade.totalCharges !== 0 ? (trade.totalProfit - trade.totalCharges < 0 ? <span className={classes.minus}>{trade.symbol}</span> : <span className={classes.plus}>{trade.symbol}</span>) : trade.symbol}</td>
            <td>{trade.type}</td>
            <td>{trade.quantity - trade.totalQuantity}</td>
            <td>{(((trade.quantity - trade.totalQuantity) / trade.account_value) * 100).toFixed(2)}%</td>
            <td>{trade.entry_price}</td>
            <td>{trade.stoploss}</td>
            <td>{(((trade.entry_price - trade.stoploss) / trade.entry_price) * 100).toFixed(2)}%</td>
            <td><span className={classes.currentStoploss}>{trade.current_stoploss}<CiEdit className={classes.edit} onClick={() => {setEdit(true); setTradeID(trade.id)}}/></span></td>
            <td>{trade.quantity * trade.entry_price}</td>
            <td>{(((trade.quantity * trade.entry_price) / trade.account_value) * 100).toFixed(2)}%</td>
            <td>{((trade.entry_price - trade.stoploss) * trade.quantity).toFixed(2)}</td>
            <td>{(((trade.entry_price - trade.stoploss) * trade.quantity) / trade.account_value).toFixed(2)}%</td>
            <td>{trade.totalProfit - trade.totalCharges !== 0 ? (trade.totalProfit - trade.totalCharges < 0 ? <span className={classes.minus}>{trade.totalProfit - trade.totalCharges}</span> : <span className={classes.plus}>{trade.totalProfit - trade.totalCharges}</span>) : 0}</td>
          </tr>
        ))}
      </tbody>
    </JournalTables>
    {edit && <EditModal edit={edit} setEdit={setEdit} tradeID={tradeID}/>}
    </>
  );
};



export default PositionsTable;
