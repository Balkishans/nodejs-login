/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Promise = require('promise');
var pool = require('./../config/database');
module.exports = {
    findAll: function () {
        return new Promise(function (resolve, reject) {
            pool.query('SELECT id, name, email,phone,address FROM employees', [])
                    .then(function (results) {
                        resolve(results.rows);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
        });
    },
    findOneById: function (id) {
        return new Promise(function (resolve, reject) {
            console.log(id);
            pool.query('SELECT * FROM employees WHERE id = $1', [id])
                    .then(function (result) {
                        if (result.rows[0]) {
                            //console.log(result.rows[0]);
                            resolve(result.rows[0]);
                        } else {
                            reject('no user found');
                        }
                    })
                    .catch(function (err) {
                        reject(err);
                    });
        });
    },

    create: function (data) {
        return new Promise(function (resolve, reject) {

            console.log('username   ' + data.name);
            return pool.query(
                    'INSERT INTO employees (name, email, phone,address) VALUES ($1, $2, $3,$4) returning id',
                    [data.name, data.email, data.phone, data.address])

                    .then(function (result) {
                        console.log('result.rows[0]   ' + result.rows[0]);
                        resolve(result.rows[0]);

                    })
                    .catch(function (err) {
                        reject(err);
                        console.log('err   ' + err);
                    });
        });
    },

    delete: function (data) {
        console.log("delete id"+data);
        const text = 'DELETE FROM employees WHERE id = $1 returning id';
        const values = [data];
        return new Promise(function (resolve, reject) {
            pool.query(text, values, (err, res) => {
                if (err) {
                    //logger.error('Error saving to db: ' + err);
                    console.log('Error saving to db: ' + err);
                    reject(0);
                    //return 0;
                } else {
                    //console.log('id' + res.rows[0].id); //This gives me the value to console.
                    resolve(res.rows[0].id);
                    // return res.rows[0].smsid;
                }
            });
        });
        
    },
    
    deleteall: function (data) {
        console.log("delete id"+data);
        const text = 'DELETE FROM employees WHERE id IN ('+data+')';
        const values = [];
        return new Promise(function (resolve, reject) {
            pool.query(text, values, (err, res) => {
                if (err) {
                    //logger.error('Error saving to db: ' + err);
                    console.log('Error deleting to db: ' + err);
                    reject(0);
                    //return 0;
                } else {
                    //console.log('id' + res.rows[0].id); //This gives me the value to console.
                    resolve(res);
                    // return res.rows[0].smsid;
                }
            });
        });
        
    },

    update: function (data) {
        return new Promise(function (resolve, reject) {
            if (!data.id) {
                reject('error: id missing')
            } else {
                pool.query('UPDATE employees SET name = $2,phone=$3,address=$4,email=$5 WHERE id = $1 returning name', [data.id, data.name,data.phone,data.address,data.email])
                        .then(function (result) {
                            resolve(result.rows[0]);
                        })
                        .catch(function (err) {
                            console.log('Error saving to db: ' + err);
                            reject(err);
                        });
            }
        });
    },
    InsertUserInDB: function (personInfo) {
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
                    resolve(res.rows[0].id);
                    // return res.rows[0].smsid;
                }
            });
        });
    }
};

function findOneByEmail(email) {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM users WHERE email = $1', [email])
                .then(function (result) {
                    if (result.rows[0]) {
                        resolve(result.rows[0]);
                    } else {
                        reject('no user found');
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
    });
}