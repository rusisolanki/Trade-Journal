import express from 'express'
import { getTrades, postTrade, editStoploss } from '../controllers/trade.js'

const router = express.Router()

router.get('/:id', getTrades)
router.post('/', postTrade)
router.post('/edit/:id', editStoploss)



export default router