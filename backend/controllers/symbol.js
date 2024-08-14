import {db} from '../db.js'

export const getSymbol = (req, res) => {
    db.query('SELECT * FROM symbol', (data, err) => {
        if(err){
            return res.send(err)
        }
        console.log(data)
        return res.status(200).json(data)
    })
}
export const getSymbolCol = (req, res) => {
    db.query('SELECT symbol.id, symbol.symbol FROM symbol', (data, err) => {
        if(err){
            return res.send(err)
        }
        
        return res.status(200).json(data)
    })
}
// SELECT symbol_id, symbol FROM symbols WHERE symbol LIKE ?



export const postSymbol = (req, res) => {
    const {symbol, name, sector, industry, journal_id} = req.body
    const data = {symbol: symbol.toUpperCase(), name, sector, industry, journal_id}
    db.query('INSERT INTO symbol SET ?', data, (err, result) => {
        if(err){
            return console.log(err)
        }
        return res.status(201).json('Data Entered Successfully')
    })
}