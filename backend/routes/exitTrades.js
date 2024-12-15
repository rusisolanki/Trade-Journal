import express from 'express'
import { getExitTrade, postExitTrade, deleteExitTrade } from '../controllers/exit.js'

const router = express.Router()

router.get('/:id', getExitTrade)
router.post('/:id', postExitTrade)
router.post('/:id/delete', deleteExitTrade)

export default router