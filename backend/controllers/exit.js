import {db} from '../db.js'

export const getExitTrade = (req, res) => {
    const q = 'SELECT * FROM journals.exit WHERE trade_id = ? ORDER BY exit_date'
    db.query(q, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json(data)
    })
}


export const postExitTrade = (req, res) => {
    db.query('INSERT INTO journals.exit SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}

export const deleteExitTrade = (req, res) => {
    console.log(req.body.exitTradeID)
    db.query('DELETE FROM journals.exit WHERE id = ?', req.body.exitTradeID, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Exit Trade Deleted')
    })
}

