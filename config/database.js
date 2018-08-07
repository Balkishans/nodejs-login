/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var pg = require("pg");
var devconfig = {
    user: 'postgres', //env var: PGUSER
    database: 'testdb', //env var: PGDATABASE
    password: 'admin', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};
var prodconfig = {
    user: 'ieetxndngvbkjr', //env var: PGUSER
    database: 'df4k7eqialvdlv', //env var: PGDATABASE
    password: '5a96ce9e8b6f8ee82201165634154d35efd5425e4431c66928aee111c14d20fd', //env var: PGPASSWORD
    host: 'ec2-54-83-22-244.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(prodconfig);
module.exports = pool;