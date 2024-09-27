import { db } from "../db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'shyam_secret_key';

export const register = (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length) {
      return res.status(409).json("User already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user(name, phone, email, password) VALUES (?)"
    const values = [
      req.body.name,
      req.body.phone,
      req.body.email,
      hash
    ]

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json('User is registered')
    })

  });
};

export const login = (req, res) => {
  const q = 'SELECT * FROM user WHERE email = ?';

  db.query(q, [req.body.email], (error, data) => {
    if(error){
      return res.json(error)
    }
    if(data.length === 0){
      return res.status(404).json('User not found!')
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    
    if(!isPasswordCorrect){
      return res.status(400).json('Invalid username or password!')
    }
    
    // const token = jwt.sign({id: data[0].id}, JWT_SECRET, {expiresIn: '1h'})
    const token = jwt.sign({ id: data[0].id }, JWT_SECRET, { expiresIn: '1h' });

    const {password, phone, ...other} = data[0]

    res.cookie("access_token", token, { httpOnly: true, secure: true }).status(200).json(other)
  })

};

export const logout = (req, res) => {
  res.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  }).status(200).json('User has been logged out')
};
