import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import authenticationRoute from './routes/authentication.js'
import tradeRoute from './routes/trades.js'
import symbolRoute from './routes/symbols.js'
import exitRoute from './routes/exitTrades.js'
import journalRoute from './routes/journals.js'
import capitalRoute from './routes/funds.js'
import noteRoute from './routes/notes.js'
import summaryRoute from './routes/tradeSummary.js'

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/authentication', authenticationRoute)
app.use('/journal', journalRoute)
app.use('/trades', tradeRoute)
app.use('/symbols', symbolRoute)
app.use('/summary', summaryRoute)
app.use('/exit', exitRoute)
app.use('/capital-deployed', capitalRoute)
app.use('/add-note', noteRoute)

app.listen(port, ()=>{
    console.log('Server is running')
})
