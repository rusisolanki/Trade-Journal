import {db} from '../db.js'

export const getTrades = (req, res) => {
    let q = 'SELECT s.symbol, t.*, c.exit_price, c.totalQuantity FROM symbols AS s RIGHT JOIN trade AS t ON t.symbol_id = s.id LEFT JOIN (SELECT t.id, e.exit_price, b.totalQuantity FROM trade t INNER JOIN journal.exit e ON t.id = e.trade_id INNER JOIN (SELECT trade_id, MAX(id) maxID, SUM(journal.exit.exit_quantity) totalQuantity FROM journal.exit GROUP BY trade_id) b ON e.trade_id = b.trade_id AND e.id = b.maxID) c ON t.id = c.id WHERE t.journals_id = ?;'
    
    db.query(q, [req.params.id], (data, err) => {
        if(err){
            return res.send(err)
        }
        
        return res.status(200).json(data)
    })
}

// export const getExitTrades = (req, res) => {
//     db.query('SELECT e.exit_price FROM exit AS e LEFT JOIN trade AS t ON e.trade_id = t.id', (err, data) => {
//         if(err){
//             return res.send(err)
//         }
//         return res.json(data)
//     })
// }

//   SELECT s.symbol, t.* FROM symbol as s
//     left join trade AS t ON t.symbol_id = s.id
// We are doing this to display all the data on the trade table

export const postTrade = (req, res) => {
    db.query('INSERT INTO trade SET ?', req.body, (err, result) => {
        if(err){
            return console.log(err)
        }
        return res.status(201).json('Data Entered Successfully')
    })
}
// export const deleteTrade = (req, res) => {
//     res.json('This is trade')
// }
// export const updateTrade = (req, res) => {
//     res.json('This is trade')
// }