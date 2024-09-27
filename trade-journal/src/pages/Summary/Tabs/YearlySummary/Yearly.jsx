import JournalTables from '../../../../components/Table/JournalTables'
import { headings } from '../../../../constants/constants'
import classes from './Yearly.module.css'

const Yearly = () => {
  return (
    <JournalTables>
      <thead>
      <tr >
        {headings.summary.map((summary, index) => (
            <th key={index} className={classes.heading}>{summary}</th>
        ))}
        </tr>
      </thead>
      <tbody>
            <tr>
                <td>A</td>
                <td>B</td>
                <td>C</td>
            </tr>
      </tbody>
    </JournalTables>
  )
}

export default Yearly
