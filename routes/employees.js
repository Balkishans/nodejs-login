/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var pg = require("pg");
var router = express.Router();
var pool = require('./../config/database');

router.get('/employees', function (req, res, next) {
    console.log('employees.js call');
    return res.render('employees/employee.ejs');
});
module.exports = router;