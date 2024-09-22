import {db} from '../db.js'

export const getMonthlyTrades = (req, res) => {
    const {month, year} = req.query
    const q = 'SELECT s.symbol, t.*, c.exit_price, c.totalQuantity, c.totalProfit, c.totalCharges, c.totalDays FROM symbol AS s RIGHT JOIN trade AS t ON t.symbol_id = s.id LEFT JOIN (SELECT t.id, e.exit_price, b.totalQuantity, b.totalProfit, b.totalCharges, b.totalDays FROM trade t INNER JOIN journals.exit e ON t.id = e.trade_id INNER JOIN (SELECT trade_id, MAX(id) maxID, SUM(journals.exit.exit_quantity) totalQuantity, SUM(journals.exit.profit) totalProfit, SUM(journals.exit.charges) totalCharges, SUM(journals.exit.exit_days) totalDays FROM journals.exit GROUP BY trade_id) b ON e.trade_id = b.trade_id AND e.id = b.maxID) c ON t.id = c.id WHERE t.journal_id = ? ORDER BY t.id DESC;'
    db.query(q, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json(data)
    })
}
