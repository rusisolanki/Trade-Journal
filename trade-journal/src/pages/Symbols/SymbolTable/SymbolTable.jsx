import { useSelector } from "react-redux";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./SymbolTable.module.css";
import PropTypes from "prop-types";
import { headings } from "../../../constants/constants";

const SymbolTable = () => {
  const symbolData = useSelector(state => state.symbolReducer.symbol)
  const filteredSymbolData = symbolData.filter(symbol => symbol.lot_size)
  const journalType = localStorage.getItem('Type')

  return (
    <JournalTables>
      <thead>
        <tr>
          {headings.symbols.map(((heading, index) => (
            <th key={index} className={classes.heading}>{heading}</th>
          )))}
          {journalType !== null && journalType === 'Future' && <th className={classes.heading}>Lot Size</th>}
        </tr>
      </thead>
      <tbody>
        {journalType === 'Future' ? filteredSymbolData.map((symbol, index) => (
            <tr key={symbol.id}>
                <td>{index+1}</td>
                <td>{symbol.symbol}</td>
                <td>{symbol.name}</td>
                <td>{symbol.sector}</td>
                <td>{symbol.industry}</td>
                <td>{symbol.lot_size}</td>
            </tr>
        )) : symbolData.map((symbol, index) => (
            <tr key={symbol.id}>
                <td>{index+1}</td>
                <td>{symbol.symbol}</td>
                <td>{symbol.name}</td>
                <td>{symbol.sector}</td>
                <td>{symbol.industry}</td>
            </tr>
        ))}
      </tbody>
    </JournalTables>
  );
};

SymbolTable.propTypes = {
    totalSymbols: PropTypes.array
};

export default SymbolTable;
