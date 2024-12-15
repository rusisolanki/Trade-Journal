import express from 'express'
import { getTrades, postTrade, editStoploss, deleteTrade } from '../controllers/trade.js'

const router = express.Router()

router.get('/:id', getTrades)
router.post('/', postTrade)
router.post('/edit/:id', editStoploss)
router.post('/delete', deleteTrade)



export default router