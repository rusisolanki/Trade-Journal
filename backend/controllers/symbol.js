import {db} from '../db.js'

export const getSymbol = (req, res) => {
    db.query('SELECT * FROM symbols', (data, err) => {
        if(err){
            return res.send(err)
        }
        console.log(data)
        return res.status(200).json(data)
    })
}
export const getSymbolCol = (req, res) => {
    db.query('SELECT id, symbol FROM symbols', (data, err) => {
        if(err){
            return res.send(err)
        }
        
        return res.status(200).json(data)
    })
}
// SELECT symbol_id, symbol FROM symbols WHERE symbol LIKE ?



export const postSymbol = (req, res) => {
    const {symbol, name, sector, industry} = req.body
    const data = {symbol: symbol.toUpperCase(), name, sector, industry}
    db.query('INSERT INTO symbols SET ?', data, (err, result) => {
        if(err){
            return console.log(err)
        }
        return res.status(201).json('Data Entered Successfully')
    })
}