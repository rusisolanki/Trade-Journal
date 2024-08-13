import express from 'express'
import { getJournal } from '../controllers/journal.js'

const router = express.Router()

router.get('/', getJournal)
// router.post('/', )

export default router