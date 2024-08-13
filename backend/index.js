import express from 'express'
import tradeRoute from './routes/trades.js'
import symbolRoute from './routes/symbols.js'
import exitRoute from './routes/exitTrades.js'
import journalRoute from './routes/journals.js'
import capitalRoute from './routes/funds.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


app.use('/journal', journalRoute)
app.use('/trades', tradeRoute)
app.use('/symbols', symbolRoute)
app.use('/exit', exitRoute)
app.use('/capital-deployed', capitalRoute)

app.listen('3000', ()=>{
    console.log('Server is running')
})
