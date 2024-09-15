import { useEffect } from "react";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./ExitTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { exitTradeActions } from "../../../store/store";
import { headings } from "../../../constants/constants";

const ExitTable = () => {
  const dispatch = useDispatch();
  const journalType = localStorage.getItem('Type')
  const tradeData = useSelector((state) => state.tradeReducer.trade);
  const exitTradeData = useSelector(
    (state) => state.exitTradeReducer.exitTrade
  );
  const tradeID = useSelector((state) => state.idReducer.tradeID);
  const entryTrade = tradeData.filter((trade) => trade.id == tradeID);
  const avgExitPrice = exitTradeData.reduce((sum, item) => {
    return (sum += item.exit_price);
  }, 0);
  const avgCharges = exitTradeData.reduce((sum, item) => {
    return (sum += item.charges);
  }, 0);
  const avgProfit = exitTradeData.reduce((sum, item) => {
    return (sum =
      sum + (item.exit_price - entryTrade[0].entry_price) * item.exit_quantity);
  }, 0);
  

  useEffect(() => {
    const fetchExitTrade = async () => {
      const exitTrade = await axios.get(
        `http://localhost:3000/exit/${tradeID}`
      );
      dispatch(exitTradeActions.change(exitTrade.data));
    };
    fetchExitTrade();

  }, [exitTradeData]);

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
            </h4>
          ) : (
            <h4 className={classes.plus}>
              {(avgProfit - avgCharges).toFixed(0)}
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
              <td>{exitTrade.exit_quantity}</td>
              <td>{exitTrade.exit_price}</td>
              <td>
                {(
                  (entryTrade[0].quantity / exitTrade.exit_quantity) *
                  100
                ).toFixed(2)}
              </td>
              <td>{}</td>
              <td>
                {Math.round(
                  Math.abs(
                    (new Date(entryTrade[0].date) -
                      new Date(exitTrade.exit_date)) /
                      (24 * 60 * 60 * 1000)
                  )
                )}
              </td>
              <td>{exitTrade.charges}</td>
              <td>
                {(exitTrade.exit_price - entryTrade[0].entry_price) *
                  exitTrade.exit_quantity >
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
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </JournalTables>
    </>
  );
};

export default ExitTable;
