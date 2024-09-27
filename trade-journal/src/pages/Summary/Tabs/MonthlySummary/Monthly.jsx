import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import JournalTables from '../../../../components/Table/JournalTables'
import { headings } from '../../../../constants/constants'
import classes from './Monthly.module.css'


const Monthly = () => {
  const [monthlyTrades, setMonthlyTrades] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchMonthlyTrades = async () => {
      const response = await axios.get(`http://localhost:3000/summary/monthly/${id}`, { 
        params: {
        month: '08',
        year: '2024'
      },
    })
      console.log(response.data)
      setMonthlyTrades(response.data)
    }
    fetchMonthlyTrades()
  }, [])

  return (
    <JournalTables>
      <thead>
      <tr>
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

export default Monthly
