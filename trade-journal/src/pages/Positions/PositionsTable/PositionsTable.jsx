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
  const [edit, setEdit] = useState(false);
  const [fundsList, setFundsList] = useState([]);
  const [adjustmentsList, setAdjustmentsList] = useState([]);
  const [tradeID, setTradeID] = useState(null);
  const { id } = useParams();
  let totalFunds = 0;
  let totalAdjustments = 0
  const dispatch = useDispatch();
  const positionsData = useSelector((state) => state.positionReducer.position);
  const tradeData = useSelector((state) => state.tradeReducer.trade);
  const journalType = localStorage.getItem("Type");

  useEffect(() => {
    const fetchTradeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/trades/${id}`);
        const trades = response.data;
        dispatch(tradeActions.change(trades));
        const filteredTrades = trades.filter(
          (trade) => trade.quantity > trade.totalQuantity
        );
        dispatch(positionActions.change(filteredTrades));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTradeData();
    // console.log(positionsData)
  }, [positionsData, id]);

  useEffect(() => {
    const fundsHandler = async () => {
      const list = await axios.get(`http://localhost:3000/capital-deployed/${id}`)
      setFundsList(list.data[0])
      setAdjustmentsList(list.data[1])
    };
    fundsHandler();
  }, []);

  const totalTradeProfit = tradeData.reduce((sum, trade) => {
   return sum += (trade.totalProfit - (trade.totalCharges + trade.charges))
  }, 0)

  for (let i = 0; i < fundsList.length; i++) {
    if (fundsList[i].funds_type === "Deposit") {
      totalFunds += fundsList[i].funds_amount;
    }
    if (fundsList[i].funds_type === "Withdraw") {
      totalFunds -= fundsList[i].funds_amount;
    }
  }
  for (let i = 0; i < adjustmentsList.length; i++) {
    if (adjustmentsList[i].adjustments_type === "Income") {
      totalAdjustments += adjustmentsList[i].adjustments_amount;
    }
    if (adjustmentsList[i].adjustments_type === "Expense") {
      totalAdjustments -= adjustmentsList[i].adjustments_amount;
    }
  }

  const totalExposure = positionsData.reduce((sum, trade) => {
    if (journalType === "Future")
      return (sum +=
        (trade.quantity - trade.totalQuantity) *
        trade.entry_price *
        trade.lot_size);
    else
      return (sum +=
        (trade.quantity - trade.totalQuantity) * trade.entry_price);
  }, 0);

  const totalOpenRisk = positionsData.reduce((sum, trade) => {
    if (journalType === "Future")
      return (sum +=
        (trade.entry_price - trade.stoploss) * trade.quantity * trade.lot_size);
    else return (sum += (trade.entry_price - trade.stoploss) * trade.quantity);
  }, 0);

  return (
    <>
      <div className={classes.positionSummary}>
        <div className={classes.container}>
          <h6>Total Open Trades</h6>
          <p className={classes.data}>{positionsData.length}</p>
        </div>
        <div className={classes.container}>
          <h6>Account Value</h6>
          <p className={classes.data}>{totalTradeProfit + totalFunds + totalAdjustments}</p>
        </div>
        <div className={classes.container}>
          <h6>Starting Account Value</h6>
          <p className={classes.data}>{totalFunds}</p>
        </div>
        <div className={classes.container}>
          <h6>Capital Deployed</h6>
          <p className={classes.data}>{totalFunds}</p>
        </div>
        <div className={classes.container}>
          <h6>Exposure</h6>
          <p className={classes.data}>
            {totalExposure}{" "}
            <span className={classes.percentage}>
              ({tradeData[0] && tradeData[0].account_value ? ((totalExposure / tradeData[0].account_value) * 100).toFixed(2) : 0}
              %)
            </span>
          </p>
        </div>
        <div className={classes.container}>
          <h6>Total Open Risk</h6>
          <p className={classes.data}>
            {totalOpenRisk}{" "}
            <span className={classes.percentage}>
              ({tradeData[0] && tradeData[0].account_value ? ((totalOpenRisk / tradeData[0].account_value) * 100).toFixed(2) : 0}
              %)
            </span>
          </p>
        </div>
      </div>

      <JournalTables>
        <thead>
          <tr>
            {journalType !== null && journalType === "Future"
              ? headings.futurePositions.map((heading, index) => (
                  <th key={index} className={classes.heading}>
                    {heading}
                  </th>
                ))
              : headings.equityPositions.map((heading, index) => (
                  <th key={index} className={classes.heading}>
                    {heading}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {positionsData.map((trade, index) => (
            <tr key={trade.id}>
              <td>
                {" "}
                <Link to={`/${id}/exit/${trade.id}`}>
                  <Button
                    className={classes.button}
                    onClick={() => dispatch(idActions.changeTrade(trade.id))}
                  >
                    {index + 1}
                  </Button>
                </Link>
              </td>
              <td>
                {new Date(trade.date).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                {trade.totalProfit - trade.totalCharges !== 0 ? (
                  trade.totalProfit - trade.totalCharges < 0 ? (
                    <span className={classes.minus}>{trade.symbol}</span>
                  ) : (
                    <span className={classes.plus}>{trade.symbol}</span>
                  )
                ) : (
                  trade.symbol
                )}
              </td>
              <td>{trade.type}</td>
              <td>{trade.quantity - trade.totalQuantity}</td>
              {journalType !== null && journalType === "Future" && (
                <td>
                  {" "}
                  {new Date(trade.expiry_date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                  })}
                </td>
              )}
              {journalType !== null && journalType === "Future" && (
                <td>{trade.lot_size}</td>
              )}
              <td>
                {(
                  ((trade.quantity - trade.totalQuantity) / trade.quantity) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td>{trade.entry_price}</td>
              <td>{trade.stoploss}</td>
              <td>
                {(
                  ((trade.entry_price - trade.stoploss) / trade.entry_price) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td>
                <span className={classes.currentStoploss}>
                  {trade.current_stoploss}
                  <CiEdit
                    className={classes.edit}
                    onClick={() => {
                      setEdit(true);
                      setTradeID(trade.id);
                    }}
                  />
                </span>
              </td>
              <td>
                {journalType === "Future"
                  ? (
                      (trade.quantity - trade.totalQuantity) *
                      trade.entry_price *
                      trade.lot_size
                    ).toFixed(2)
                  : (
                      (trade.quantity - trade.totalQuantity) *
                      trade.entry_price
                    ).toFixed(2)}
              </td>
              <td>
                {(
                  ((trade.quantity * trade.entry_price) / trade.account_value) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td>
                {journalType === "Future" ? (
                  (trade.entry_price - trade.current_stoploss) *
                  trade.quantity *
                  trade.lot_size
                ).toFixed(2):(
                  (trade.entry_price - trade.current_stoploss) *
                  trade.quantity
                ).toFixed(2) }
              </td>
              <td>
                {journalType === "Future" ? (
                  (((trade.entry_price - trade.current_stoploss) * trade.quantity *
                  trade.lot_size) /
                  trade.account_value) * 100
                ).toFixed(2) : (
                  (((trade.entry_price - trade.current_stoploss) * trade.quantity) /
                  trade.account_value) * 100
                ).toFixed(2)}
                %
              </td>
              <td>
                {trade.totalProfit - (trade.totalCharges + trade.charges) !== 0 ? (
                  trade.totalProfit - (trade.totalCharges + trade.charges) < 0 ? (
                    <span className={classes.minus}>
                      {trade.totalProfit - (trade.totalCharges + trade.charges)}
                    </span>
                  ) : (
                    <span className={classes.plus}>
                      {trade.totalProfit - (trade.totalCharges + trade.charges)}
                    </span>
                  )
                ) : (
                  0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </JournalTables>
      {edit && <EditModal edit={edit} setEdit={setEdit} tradeID={tradeID} />}
    </>
  );
};

export default PositionsTable;
