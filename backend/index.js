import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authenticationRoute from './routes/authentication.js'
import tradeRoute from './routes/trades.js'
import symbolRoute from './routes/symbols.js'
import exitRoute from './routes/exitTrades.js'
import journalRoute from './routes/journals.js'
import capitalRoute from './routes/funds.js'


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/authentication', authenticationRoute)
app.use('/journal', journalRoute)
app.use('/trades', tradeRoute)
app.use('/symbols', symbolRoute)
app.use('/exit', exitRoute)
app.use('/capital-deployed', capitalRoute)

app.listen('3000', ()=>{
    console.log('Server is running')
})
