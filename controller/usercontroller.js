/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Promise = require('promise');
var pool = require('./../config/database');
function InsertUserInDB(personInfo) {
    const text = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning id';
    var datenow = new Date();
    const values = [personInfo.username, personInfo.email, personInfo.password];
    return new Promise(function (resolve, reject) {
        pool.query(text, values, (err, res) => {
            if (err) {
                //logger.error('Error saving to db: ' + err);
                console.log('Error saving to db: ' + err);
                reject(0);
                //return 0;
            } else {
                console.log('id' + res.rows[0].id); //This gives me the value to console.
                resolve(res.rows[0].id );
                // return res.rows[0].smsid;
            }
        });
    });
}
module.exports = InsertUserInDB;
