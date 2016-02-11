
var mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'theUser',
    password    : 'password123@',
    database    : 'it410'
});

connection.connect();

//create user
exports.createUser = function(userID, lastName, firstName, userPwd, age) {
    return new Promise(function(res, rej){
        connection.query('INSERT INTO Users(userID, lastName, firstName, userPwd, age) VALUES ("'+ userID +'", "'+ lastName +'", "'+ firstName +'", "'+ userPwd +'", "'+ age +'")',
        function(err, rows, fields){
            if(err){
                res(false);
            }else{
                res(true);
            }
        });
    });
};

//update password
exports.updatePassword = function(userID, userPwd, newUserPwd){
    return exports.authenticate(userID, userPwd)
        .then(function(authenticated){
            if(authenticated){
                connection.query('UPDATE Users SET userPwd="'+ newUserPwd +'" WHERE userID="'+ userID +'"',
                function(err, rows, fields){
                    if(err){return false;}
                });
                return true;
            }else{
                return false;
            }
        });
};

//Authenticate
exports.authenticate = function(userID, userPwd){
    return new Promise(function(res, rej){
        connection.query('SELECT userPwd FROM Users WHERE userID="'+ userID +'"', function(err, rows, fields){
            if(err){rej(err);}
            var givenPwd = userPwd;
            if(rows[0] == null){
                return rej("user dont exist");
            }
            var qPwd = rows[0].userPwd;
            if(givenPwd == qPwd){
                res(true);
            }else{
                res(false);
            }
        });
    });
};

//remove user
exports.removeUser = function(userID, userPwd){
    return exports.authenticate(userID, userPwd)
        .then(function(authenticated){
            if(authenticated){
                connection.query('DELETE FROM Users WHERE userID="'+ userID +'"', function(err, rows, fields){
                    if(err){return false;}
                });
                return true;
            }else{
                return false;
            }
        });
};

