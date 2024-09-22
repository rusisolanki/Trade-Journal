import express from 'express'
import { getNote, postNote } from '../controllers/note.js'

const router = express.Router()

router.get('/:id', getNote)
router.post('/:id', postNote)

export default router