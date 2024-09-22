import {db} from '../db.js'

export const getTrades = (req, res) => {
    let q = 'SELECT s.symbol, s.lot_size, t.*, c.exit_price, c.totalQuantity, c.totalProfit, c.totalCharges, c.totalDays FROM symbol AS s RIGHT JOIN trade AS t ON t.symbol_id = s.id LEFT JOIN (SELECT t.id, e.exit_price, b.totalQuantity, b.totalProfit, b.totalCharges, b.totalDays FROM trade t INNER JOIN journals.exit e ON t.id = e.trade_id INNER JOIN (SELECT trade_id, MAX(id) maxID, SUM(journals.exit.exit_quantity) totalQuantity, SUM(journals.exit.profit) totalProfit, SUM(journals.exit.charges) totalCharges, SUM(journals.exit.exit_days) totalDays FROM journals.exit GROUP BY trade_id) b ON e.trade_id = b.trade_id AND e.id = b.maxID) c ON t.id = c.id WHERE t.journal_id = ? ORDER BY t.id DESC;'
    
    db.query(q, [req.params.id], (data, err) => {
        if(err){
            return res.send(err)
        }
        // data.filter(data => data.entry_quantity > data.totalExitQuantity)
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
            return res.send(err)
        }
        return res.status(201).json('Data Entered Successfully')
    })
}
// export const deleteTrade = (req, res) => {
//     res.json('This is trade')
// }

export const editStoploss = (req, res) => {
   const q = "UPDATE trade SET current_stoploss = ? WHERE id = ?;"
    db.query(q, [req.body.current_stoploss, req.params.id], (err, result) => {
        if(err){
            return res.send(err)
        }
        return res.json('Record Updated')
    })
}