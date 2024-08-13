import { useSelector } from "react-redux";
import JournalTables from "../../../components/Table/JournalTables";
import classes from "./SymbolTable.module.css";
import PropTypes from "prop-types";
import { headings } from "../../../constants/constants";

const SymbolTable = () => {
  const symbolData = useSelector(state => state.symbolReducer.symbol)

  return (
    <JournalTables>
      <thead>
        <tr>
          {headings.symbols.map(((heading, index) => (
            <th key={index} className={classes.heading}>{heading}</th>
          )))} 
        </tr>
      </thead>
      <tbody>
        {symbolData.map(symbol => (
            <tr key={symbol.id}>
                <td>{symbol.id}</td>
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
