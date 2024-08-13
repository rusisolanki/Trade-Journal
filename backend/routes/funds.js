import express from 'express'
import { getFunds, postFunds, postAdjustments } from '../controllers/fund.js'

const router = express.Router()

router.get('/:id', getFunds)
router.post('/', postFunds)
router.post('/adjustment', postAdjustments)



export default router