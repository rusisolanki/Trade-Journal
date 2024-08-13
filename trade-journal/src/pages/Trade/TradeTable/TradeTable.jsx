import Button from "react-bootstrap/esm/Button";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./TradeTable.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { headings } from "../../../constants/constants";
import { useEffect } from "react";
import axios from "axios";
import { idActions, tradeActions } from "../../../store/store";


const TradeTable = () => {
  const dispatch = useDispatch()
  const tradeData = useSelector(state => state.tradeReducer.trade)
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
    <JournalTables>
      <thead>
        <tr>
          {headings.trade.map((heading, index) => (
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
            <td>{trade.symbol}</td>
            <td>{trade.quantity}</td>
            <td>{trade.entry_price}</td>
            <td>{trade.stoploss}</td>
            <td>{(((trade.entry_price - trade.stoploss)/trade.entry_price) * 100).toFixed(2)}%</td>
            <td>{(trade.entry_price * trade.quantity).toFixed(2)}</td>
            <td>PS%</td>
            <td>{(trade.quantity * (trade.entry_price - trade.stoploss)).toFixed(2)}</td>
            <td>RPT%</td>
            <td>{trade.totalQuantity ? (trade.quantity / trade.totalQuantity).toFixed(2): 'N/A'}</td>
            <td>{trade.exit_price ? trade.exit_price : 'N/A'}</td>
            <td>{trade.exit_price ? ((trade.exit_price - trade.entry_price)/trade.entry_price).toFixed(2) : 'N/A'}</td>
            <td>Capital</td>
            <td>RoCD</td>
            <td>SAV</td>
            <td>ROSV</td>
            <td>AV</td>
            <td>AG%</td>
            <td>Days</td>
            <td>RR</td>
            <td>NP</td>
          </tr>
        ))}

      </tbody>
    </JournalTables>
  );
};


export default TradeTable;
