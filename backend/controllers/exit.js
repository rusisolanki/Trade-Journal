import {db} from '../db.js'

export const getExitTrade = (req, res) => {
    const q = 'SELECT * FROM journal.exit WHERE trade_id = ? ORDER BY exit_date'
    db.query(q, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json(data)
    })
}


export const postExitTrade = (req, res) => {
    console.log(req.body)
    db.query('INSERT INTO journal.exit SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}