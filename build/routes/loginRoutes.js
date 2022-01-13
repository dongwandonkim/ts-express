"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("\n      <div>\n        <div> You are not allowed</div>\n        <a href=\"/login\">login</a>\n      </div>\n    ");
};
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\" />\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === 'test@test.com' &&
        password === 'pass1234') {
        req.session = { loggedIn: true };
        console.log(req.session);
        res.redirect('/');
    }
    else {
        res.send('email not provided');
    }
});
router.get('/', function (req, res) {
    var session = req.session;
    if (session && session.loggedIn) {
        res.send("\n      <div>\n        <div> You are logged in</div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div> You are not logged in</div>\n        <a href=\"/login\">login</a>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('you are allowed');
});
