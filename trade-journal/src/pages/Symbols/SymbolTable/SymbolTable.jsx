import { useState } from "react";
import { useSelector } from "react-redux";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./SymbolTable.module.css";
import PropTypes from "prop-types";
import { headings } from "../../../constants/constants";
import { CiEdit } from "react-icons/ci";
import EditModal from "../EditModal/EditModal";

const SymbolTable = () => {
  const [edit, setEdit] = useState(false);
  const [symbolID, setSymbolID] = useState();
  const symbolData = useSelector((state) => state.symbolReducer.symbol);
  const filteredSymbolData = symbolData.filter((symbol) => symbol.lot_size);
  const journalType = localStorage.getItem("Type");

  return (
    <JournalTables>
      <thead>
        <tr>
          {headings.symbols.map((heading, index) => (
            <th key={index} className={classes.heading}>
              {heading}
            </th>
          ))}
          {journalType !== null && journalType === "Future" && (
            <th className={classes.heading}>LOT SIZE</th>
          )}
        </tr>
      </thead>
      <tbody>
        {journalType === "Future"
          ? filteredSymbolData.map((symbol, index) => (
              <tr key={symbol.id}>
                <td>{index + 1}</td>
                <td>{symbol.symbol}</td>
                <td>{symbol.name ? symbol.name : "-"}</td>
                <td>{symbol.sector ? symbol.sector : "-"}</td>
                <td>{symbol.industry ? symbol.industry : "-"}</td>
                <td className={classes.lotSize}>
                {symbol.lot_size}
                  <CiEdit
                    fontSize="1.5em"
                    onClick={() => { setEdit(true); setSymbolID(symbol.id)}}
                  /> 
                </td>
              </tr>
            ))
          : symbolData.map((symbol, index) => (
              <tr key={symbol.id}>
                <td>{index + 1}</td>
                <td>{symbol.symbol}</td>
                <td>{symbol.name}</td>
                <td>{symbol.sector}</td>
                <td>{symbol.industry}</td>
              </tr>
            ))}
      </tbody>
      {edit && <EditModal edit={edit} setEdit={setEdit} symbolID={symbolID} />}
    </JournalTables>
  );
};

SymbolTable.propTypes = {
  totalSymbols: PropTypes.array,
};

export default SymbolTable;
