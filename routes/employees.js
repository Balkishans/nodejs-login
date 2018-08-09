/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var pg = require("pg");
var router = express.Router();
var pool = require('./../config/database');
var employee = require('./../controller/employeecontroller');
var app = express();
var loggedIn=require('./../config/genutil');


router.get('/employees',loggedIn ,function (req, res, next) {
    console.log('employees.js call');
    employee.findAll()
      .then(function(result) {
        //return res.status(200).json(result);
        //res.locals.employees = res.status(200).json(result);
        console.log(result);
        return res.render('employees/employee.ejs',{employees:result});
      })
      .catch(function(err) {
          
          return res.render('employees/employee.ejs',{employees:err});
//        return res.status(400).json({
//          message: err
//        });
      });
    
    
});

router.post('/addemployee', loggedIn ,function (req, res, next) {
    
     employee.create(req.body)
      .then(function(result) {
          res.send({"Success": "success! created new employee"});
        
      })
      .catch(function(err) {
        res.send({"Success": "Failed! created new employee"});
      });
    
});

router.get('/getemployee',loggedIn , function (req, res, next) {
    console.log('getemployee call'+req.query.variable);
    employee.findOneById(req.query.variable)
      .then(function(result) {
           console.log(result);
        return res.status(200).json(result);
        //res.locals.employees = res.status(200).json(result);
       
        //return res.render('employees/employee.ejs',{employees:result});
      })
      .catch(function(err) {
          res.locals.employees = '';
          //return res.render('employees/employee.ejs',{employees:err});
        return res.status(400).json({
          message: err
        });
      });
    
    
});

router.get('/deleteemployee', loggedIn ,function (req, res, next) {
    console.log('deleteemployee call'+req.query.variable);
    var iddelete=req.query.variable;
    employee.delete(iddelete)
      .then(function(result) {
           
         //  res.render('/employees');
        return res.status(200).json(result);
        //res.locals.employees = res.status(200).json(result);
       
        //return res.render('employees/employee.ejs',{employees:result});
      })
      .catch(function(err) {
         
          //return res.render('employees/employee.ejs',{employees:err});
        res.send({"Success": "Failed! delete employee"});
      });
    
    
});

router.post('/updateemployee', loggedIn ,function (req, res, next) {
    
     employee.update(req.body)
      .then(function(result) {
          console.log('return '+result.name);
          res.send({"Success": "success! update "+result.name+" employee"});
        
      })
      .catch(function(err) {
        res.send({"Success": "Failed! update employee"});
      });
    
});
router.get('/deleteallemployee', loggedIn ,function (req, res, next) {
    console.log('deleteallemployee call'+req.query.variable);
    var iddelete=req.query.variable;
    employee.deleteall(iddelete)
      .then(function(result) {
           
         //  res.render('/employees');
        //return res.status(200);
        //res.locals.employees = res.status(200).json(result);
        res.send({"Success": "Failed! delete all employee"});
        //return res.render('employees/employee.ejs',{employees:result});
      })
      .catch(function(err) {
         
          //return res.render('employees/employee.ejs',{employees:err});
        res.send({"Success": "Failed! delete all employee"});
      });
    
    
});
module.exports = router;