import express from 'express'
import { getMonthlyTrades } from '../controllers/summary.js'

const router = express.Router()

router.get('/monthly/:id', getMonthlyTrades)

export default router