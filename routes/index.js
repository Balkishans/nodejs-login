var express = require('express');
var pg = require("pg");
var router = express.Router();
var pool = require('./../config/database');
//var config = {
//    user: 'postgres',
//    database: 'testdb',
//    password: 'admin',
//    port: 5432,
//    max: 10, // max number of connection can be open to database
//    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//};
//var pool = new pg.Pool(config);
router.get('/', function (req, res, next) {
    return res.render('index.ejs');
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    var personInfo = req.body;


    if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
        res.send();
    } else {
        if (personInfo.password == personInfo.passwordConf) {

            pool.connect(function (err, client, done) {
                if (err) {
                    console.log("not able to get connection " + err);
                    res.status(400).send(err);
                }
                client.query('SELECT * FROM users WHERE email = $1', [personInfo.email], function (err, result) {
                    //call `done()` to release the client back to the pool
                    //done();
                    console.log(result.rows[0]);
                    if (result.rows[0]) {
                        res.send({"Success": "Email is already used."});
                    } else {
                        console.log(personInfo.username);
                        console.log(personInfo.email);
                        console.log(personInfo.password);
                        client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning id', [personInfo.username, personInfo.email, personInfo.password], function (err, result) {
                            
                            done();
                            console.log(result.rows[0].id);
                            if (result.rows[0]) {
                                res.send({"Success": "You are regestered,You can login now."});
                            }


                        });

                    }
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    //res.status(200).send(result.rows);
                });
            });
        } else {
            res.send({"Success": "password is not matched"});
        }
    }
});

router.get('/login', function (req, res, next) {
    return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.email);
    pool.connect(function (err, client, done) {
        client.query('SELECT * FROM users WHERE email = $1', [req.body.email], function (err, data) {
            done();
            if (data.rows[0]) {
                console.log('data.password...' + data.rows[0].password);
                console.log('data.id...' + data.rows[0].id);
                if (data.rows[0].password === req.body.password) {
                    //console.log("Done Login");
                    req.session.userId = data.rows[0].id;
                    //console.log(req.session.userId);
                    res.send({"Success": "Success!"});

                } else {
                    res.send({"Success": "Wrong password!"});
                }
            } else {
                res.send({"Success": "This Email Is not regestered!"});
            }

        });
    });
});
router.get('/profile', function (req, res, next) {
    console.log("profile");
    pool.connect(function (err, client, done) {
        client.query('SELECT * FROM users WHERE id = $1', [req.session.userId], function (err, data) {
            done();
            console.log(data.rows[0]);
            if (!data.rows[0]) {
                res.redirect('/');
            } else {
                //console.log("found");
                return res.render('data.ejs', {"name": data.rows[0].name, "email": data.rows[0].email});
            }
        });
    });
});

router.get('/logout', function (req, res, next) {
    console.log("logout")
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});
router.get('/forgetpass', function (req, res, next) {
    res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
    //console.log('req.body');
    //console.log(req.body);
    pool.connect(function (err, client, done) {
        client.query('SELECT * FROM users WHERE email = $1', [req.body.email], function (err, data) {
            done();
            console.log(data.rows[0].email);
            if (!data.rows[0]) {
                res.send({"Success": "This Email Is not regestered!"});
            } else {
                // res.send({"Success":"Success!"});
                if (req.body.password === req.body.passwordConf) {
                    //data.password = req.body.password;
                    //data.passwordConf = req.body.passwordConf;
                    client.query('UPDATE users SET password= $2 WHERE email = $1 returning *', [data.rows[0].email, req.body.password], function (err, data) {
                        done();
                        if (err)
                            console.log(err);
                        else
                            console.log('Success');
                        res.send({"Success": "Password changed!"});


                    });

                } else {
                    res.send({"Success": "Password does not matched! Both Password should be same."});
                }
            }
        });
    });

});

module.exports = router;