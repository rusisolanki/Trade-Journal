import { useEffect, useState } from "react";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./ExitTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { exitTradeActions } from "../../../store/store";
import { headings } from "../../../constants/constants";

const ExitTable = () => {
  const dispatch = useDispatch();
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const journalType = localStorage.getItem('Type');
  const exitTradeData = useSelector((state) => state.exitTradeReducer.exitTrade);
  const tradeID = useSelector((state) => state.idReducer.tradeID);
  const journalID = localStorage.getItem('JournalID');

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/trades/${journalID}`);
        setTrades(response.data);
        setIsLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Error occurred, stop loading
      }
    };
    fetchTradeData();
  }, [journalID]);

  // Filter trade data to get the selected trade
  const entryTrade = trades.filter((trade) => trade.id == tradeID);

  useEffect(() => {
    const fetchExitTrade = async () => {
      const exitTrade = await axios.get(`http://localhost:3000/exit/${tradeID}`);
      dispatch(exitTradeActions.change(exitTrade.data));
    };
    fetchExitTrade();
  }, [exitTradeData, tradeID, dispatch]);

  // Check if data is still loading or if no matching entryTrade is found
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!entryTrade[0]) {
    return <p>No trade data available.</p>;
  }

  const avgExitPrice = exitTradeData.reduce((sum, item) => {
    return (sum += item.exit_price);
  }, 0);

  const avgCharges = exitTradeData.reduce((sum, item) => {
    return (sum += item.charges + entryTrade[0].charges);
  }, 0);

  const avgProfit = exitTradeData.reduce((sum, item) => {
    if (journalType === 'Future') {
      return (sum += (item.exit_price - entryTrade[0].entry_price) * item.exit_quantity * entryTrade[0].lot_size);
    }
    return (sum += (item.exit_price - entryTrade[0].entry_price) * item.exit_quantity);
  }, 0);

  const leftQuantity = entryTrade[0].quantity - entryTrade[0].totalQuantity
  
  const weightedAverage = exitTradeData.reduce((sum, item) => {
    return sum = sum + (((item.exit_price - entryTrade[0].entry_price) / (entryTrade[0].entry_price - entryTrade[0].stoploss)) * (item.exit_quantity / entryTrade[0].quantity))
  }, 0)


  return (
    <>
      <div className={classes.trade}>
        <div>
          <h5>{entryTrade[0].symbol}</h5>
          <p>
            {new Date(entryTrade[0].date).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          {avgProfit - avgCharges < 0 ? (
            <h4 className={classes.minus}>
              {(avgProfit - avgCharges).toFixed(0)}
              <span className={classes.weightedAvg}>({weightedAverage.toFixed(1)}R)</span>
            </h4>
          ) : (
            <h4 className={classes.plus}>
              {(avgProfit - avgCharges).toFixed(0)}
              <span className={classes.weightedAvg}>({weightedAverage.toFixed(1)}R)</span>
            </h4>
          )}
        </div>
      </div>
      <div className={classes.exitStrategy}>
        <div>
          <h4>Avg. Entry Price</h4>
          <p>{entryTrade[0].entry_price}</p>
        </div>
        <div>
          <h4>Account Value</h4>
          <p>{entryTrade[0].account_value}</p>
        </div>
        <div>
          <h4>Stoploss</h4>
          <p>{entryTrade[0].stoploss}</p>
        </div>
        <div>
          <h4>Avg. Exit Price</h4>
          <p>
            {avgExitPrice
              ? (avgExitPrice / exitTradeData.length).toFixed(2)
              : 0}
          </p>
        </div>
        <div>
          <h4>Position Size</h4>
          <p>
            {journalType === 'Future' ? (entryTrade[0].entry_price * entryTrade[0].quantity * entryTrade[0].lot_size).toFixed(2) : (entryTrade[0].entry_price * entryTrade[0].quantity).toFixed(2)}
          </p>
        </div>
        <div>
          <h4>RPT</h4>
          <p>{(entryTrade[0].quantity * (entryTrade[0].entry_price - entryTrade[0].stoploss)).toFixed(2)}</p>
        </div>
      </div>
      <JournalTables>
        <thead>
          <tr>
            {headings.entry.map((heading, index) => (
              <th key={index} className={classes.heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {new Date(entryTrade[0].date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td>{entryTrade[0].entry_price}</td>
            <td>{entryTrade[0].quantity}</td>
            <td>{entryTrade[0].stoploss}</td>
            <td>
              {(
                ((entryTrade[0].entry_price - entryTrade[0].stoploss) /
                  entryTrade[0].entry_price) *
                100
              ).toFixed(2)}
            </td>
            <td>
              {(entryTrade[0].entry_price * entryTrade[0].quantity).toFixed(2)}
            </td>
            <td>
              {(entryTrade[0].quantity * (entryTrade[0].entry_price - entryTrade[0].stoploss)).toFixed(2)}
            </td>
            <td>
              {entryTrade[0].charges}
            </td>
          </tr>
        </tbody>
      </JournalTables>
      <JournalTables>
        <thead>
          {headings.exit.map((heading, index) => (
            <th key={index} className={classes.heading}>
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {exitTradeData?.map((exitTrade) => (
            <tr key={exitTrade.id}>
              <td>
                {new Date(exitTrade.exit_date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>{exitTrade.exit_price}</td>
              <td>
                {(
                  (exitTrade.exit_quantity / entryTrade[0].quantity) *
                  100
                ).toFixed(2)}
              </td>
              <td>
                {Math.round(
                  Math.abs(
                    (new Date(entryTrade[0].date) -
                      new Date(exitTrade.exit_date)) /
                      (24 * 60 * 60 * 1000)
                  )
                )}
              </td>
              <td>{exitTrade.exit_quantity} <span>({((exitTrade.exit_quantity / entryTrade[0].quantity) * 100).toFixed(2)}%)</span></td>
              <td>{exitTrade.charges}</td>
              <td>
                {journalType === 'Future' ? ((exitTrade.exit_price - entryTrade[0].entry_price) >
                0 ? (
                  <span className={classes.plus}>
                    {(
                      (exitTrade.exit_price - entryTrade[0].entry_price) *
                      exitTrade.exit_quantity * entryTrade[0].lot_size
                    ).toFixed(0)}
                  </span>
                ) : (
                  <span className={classes.minus}>
                    {(
                      (exitTrade.exit_price - entryTrade[0].entry_price) *
                      exitTrade.exit_quantity * entryTrade[0].lot_size
                    ).toFixed(0)}
                  </span>
                )): ((exitTrade.exit_price - entryTrade[0].entry_price) >
                0 ? (
                  <span className={classes.plus}>
                    {(
                      (exitTrade.exit_price - entryTrade[0].entry_price) *
                      exitTrade.exit_quantity
                    ).toFixed(0)}
                  </span>
                ) : (
                  <span className={classes.minus}>
                    {(
                      (exitTrade.exit_price - entryTrade[0].entry_price) *
                      exitTrade.exit_quantity
                    ).toFixed(0)}
                  </span>
                ))}
              </td>
              <td>{((exitTrade.exit_price - entryTrade[0].entry_price) / (entryTrade[0].entry_price - entryTrade[0].stoploss)).toFixed(1)}R</td>
            </tr>
          ))}
           <tr>
            <td colSpan={4}>Total</td>
            <td>{leftQuantity} <span>({((leftQuantity / entryTrade[0].quantity) * 100).toFixed(2)}%)</span></td>
            <td>{entryTrade[0].totalCharges ? entryTrade[0].totalCharges : entryTrade[0].charges}</td>
            <td>{entryTrade[0].totalProfit > 0 ? <span className={classes.plus}>{entryTrade[0].totalProfit}</span> : <span className={classes.minus}>{entryTrade[0].totalProfit}</span> }</td>
            <td>{weightedAverage.toFixed(1)}R</td>
          </tr>
        </tbody>
      </JournalTables>
    </>
  );
};

export default ExitTable;
