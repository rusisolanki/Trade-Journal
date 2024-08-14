import {db} from '../db.js'

export const getJournal = (req, res) => {
    const q = 'SELECT * FROM journals.journal'
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json(data)
    })
}


export const postJournal = (req, res) => {
    console.log(req.body)
    db.query('INSERT INTO journals.journal SET ?', req.body, (err, result) => {
        if(err){
            return res.json(err)
        }
        return res.status(201).json('Succeesful')
    })
}