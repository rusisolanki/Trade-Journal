import express from 'express'
import { getExitTrade, postExitTrade } from '../controllers/exit.js'

const router = express.Router()

router.get('/:id', getExitTrade)
router.post('/:id', postExitTrade)

export default router