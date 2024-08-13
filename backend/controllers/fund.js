import {db} from '../db.js'

export const getFunds = (req, res) => {
    let q = 'SELECT * FROM funds WHERE journal_id = ?;'
    q += 'SELECT * FROM adjustments WHERE journal_id = ?;'
    db.query(q, [req.params.id, req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json(data)
    })
}


export const postFunds = (req, res) => {
    
    db.query('INSERT INTO funds SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}

export const postAdjustments = (req, res) => {
    
    db.query('INSERT INTO adjustments SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}