/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loggedIn(req, res, next) {
    if (req.session.userId) {
        console.log('check user loggedin..'+req.session.userId);
        next();
    } else {
        console.log('check user loggedin..'+req.session.userId);
        res.redirect('/login');
    }
}
module.exports = loggedIn;
