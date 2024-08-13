import express from 'express'
import { getTrades, postTrade } from '../controllers/trade.js'

const router = express.Router()

router.get('/:id', getTrades)
// router.get('/', getExitTrades)
router.post('/', postTrade)
// router.get('/:id', getTrade)
// router.get('/', postTrade)
// router.get('/:id', updateTrade)
// router.get('/:id', deleteTrade)


export default router