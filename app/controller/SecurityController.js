/**
 * User Controller
 *
 * Controlls user actions
 **/

var async = require('neo-async');
var _ = require('underscore');
var UserModel = require('../model/UserModel');
var userModel = new UserModel();
var md5 = require('MD5');


/**
 * Sends auth data to the user
 *
 * @param {Object} req Request
 * @param {Object} res Response
 */
exports.sendAuthData = function (req, res) {
    if (req.user === undefined) {
        return res.status(500).send('No active session found.');
    }

    userModel.resolveUserPerson(req.user, function (err, person) {
        if (err) {
            return res.status(500).send('Cannot resolve person profile of user ' + req.user.id);
        }
        res.status(200).json({
            id: req.user.id,
            personId: person.id,
            userId: req.user.uid,
            groups: req.user.groups,
            session: req.sessionID
        });
    });
};

/**
 * Performs user logout
 *
 * @param {Object} req request
 * @param {Object}   res resonse
 */
exports.logout = function (req, res, next) {
    if (req.user === undefined) {
        return res.status(500).send('No active session found.');
    }

    console.info('Session ' + req.sessionID + ' closed. User ' + req.user.uid + ' logger out.');
    req.logOut();
    res.clearCookie('connect.sid');
    res.status(200).send('Logged out');
};


/**
 * Search for user entry in db and resolve it
 *
 * @param   {String}   uid      Userid to be searched
 * @param   {Function} callback function that need to be callbacked
 * @returns {Function} callback
 */
exports.resolveUser = function (uid, done) {
    async.waterfall([

        function (callback) {
            return userModel.resolveUser(uid, callback);
        }
    ], function (error, user) {
        if (error) {
            console.info('Cannot find User ' + uid + ':' + error);
        }
        return done(error, user);
    });
};

/**
 * Process user authorization
 *
 * @param {String}   uid Username
 * @param {String}   password Password
 * @param {Function} done Callback funtion
 */
exports.authenticateUser = function (req, uid, password, done) {
    console.info('Start login process.');
    async.waterfall([

        function (callback) {
            return userModel.resolveUser(uid, callback);
        },

        function (user, callback) {
            if (!user) {
                return callback(null, false);
            }
            var authenticationResult = md5(password) === user.passwordMD5;
            if (authenticationResult) {
                console.info('User ' + uid + ' logged in.');
                callback(null, user);
            } else {
                console.info('User ' + uid + ' password wrong');
                callback(null, false);
            }
        }

    ], function (error, user) {
        if (error) {
            console.info('Cannot login User ' + uid + ':' + error);
        }
        return done(error, user);
    });
};


/**
 * Registers user and authenticates it at the same time
 *
 * @param   {Object}   req      request
 * @param   {String}   username username
 * @param   {String}   password password
 * @param   {Function} done     done funtion of passport
 * @returns {Function} return registered user or fail.
 */
exports.registerUser = function (req, username, password, done) {
    console.info('Start registration of user:' + username);

    async.waterfall([

        function (callback) {
            userModel.findUser(username, callback);
        },
        function (user, callback) {
            // If user found, break and send error code to client
            if (user) {
                return callback('Username already exist!');
            }

            var userData = req.body;
            userModel.createUserWithPerson(userData, callback);
        }
    ], function (error, user) {
        if (error) {
            console.info('Cannot register User ' + username + ':' + error);
        }
        req.session.user = user;
        done(error, user);

    });


};