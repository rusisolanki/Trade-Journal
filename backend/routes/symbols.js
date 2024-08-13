import express from 'express'
import { getSymbol, postSymbol, getSymbolCol } from '../controllers/symbol.js'

const router = express.Router()

router.get('/', getSymbol)
router.get('/symbols', getSymbolCol)
router.post('/', postSymbol)
// // router.get('/:id', getTrade)
// // router.get('/', postTrade)
// // router.get('/:id', updateTrade)
// // router.get('/:id', deleteTrade)


export default router