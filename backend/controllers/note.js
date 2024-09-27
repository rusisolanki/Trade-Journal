import {db} from '../db.js'

export const getNote = (req, res) => {
    const q = 'SELECT * FROM notes WHERE trade_id = ?'
    db.query(q, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        
        return res.status(201).json(data)
    })
}

export const postNote = (req, res) => {
    console.log(req.body)
    db.query('INSERT INTO journals.notes SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}