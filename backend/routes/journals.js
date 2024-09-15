import express from 'express'
import { getJournal, postJournal } from '../controllers/journal.js'

const router = express.Router()

router.get('/', getJournal)
router.post('/', postJournal)

export default router