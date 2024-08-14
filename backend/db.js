import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin123',
    database: 'journals',
    multipleStatements: true
})