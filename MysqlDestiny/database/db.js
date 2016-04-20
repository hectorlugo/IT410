var mysql = require('mysql');
var Promise = require('bluebird');

//connect to database
var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'theUser',
    password:   'password123@',
    database:   'destiny'
});
connection.connect();

//Authenticate user
exports.authenticateUser = function(username, password){
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM users WHERE username='"+ username +"' AND password='"+ password +"'", function(err, rows){
            rows.forEach(function(value){
                if(value.username === username && value.password === password){
                    console.log('You have logged in!');
                    resolve(value);
                }
            });
            reject("Incorrect username or password");
        });
    });
};

//Finds User
exports.findUser = function(username){
    return new Promise(function(resolve, reject){
        connection.query('SELECT username FROM users WHERE username="'+ username +'"', function(err, rows){
            rows.forEach(function(value){
                if(value.username === username) resolve(value);
            })
            reject("User does not exist");
        });
    });
};

//create user
exports.createUser = function(username, password){
    return new Promise(function(resolve,reject){
        var post = {username:username, password:password};
        connection.query("INSERT INTO users SET ?", post, function(err, result){
            if(!err) resolve("New user created");
            else reject("User already exists")
        })
    });
};

//get User Guardians
exports.getGuardians = function(username){
    return new Promise(function(resolve, reject){
        connection.query('Select GuardianID, class, gender, race, level from Guardians where username="'+ username +'"', function(err, rows){
            resolve(rows);
        });

    });
};

//add Guardian
exports.addGuardian = function(GuardianID, username, gClass, gender, race, level){
    return new Promise(function(resolve, reject){
        var post = {GuardianID:GuardianID, username:username, class:gClass, gender:gender, race:race, level:level};
        connection.query("INSERT INTO Guardians SET ?", post, function(err, result){
            //console.log(result);
            if(!err) resolve(result);
            else reject('GuardianID must be Unique.');
        });
    });
};

//add Weapon
exports.addWeapon = function(username, WeaponID, WeaponName, Type, Subtype, Attack){
    return new Promise(function(resolve, reject){
        var post = {username:username, WeaponID:WeaponID, WeaponName:WeaponName, WeaponType:Type, Subtype:Subtype, Attack:Attack};
        connection.query("INSERT INTO WeaponVault SET ?", post, function(err, result){
            //console.log(result);
            if(!err) resolve(result);
            else reject('Weapon must be Unique.');
        });
    });
};

//add Armor
exports.addArmor = function(username, ArmorID, ArmorName, Type, Defense, intellect, discipline, strength){
    return new Promise(function(resolve, reject){
        var post = {username:username, ArmorID:ArmorID, ArmorName:ArmorName, ArmorType:Type, Defense:Defense, intellect:intellect, discipline:discipline, strength:strength};
        connection.query("INSERT INTO ArmorVault SET ?", post, function(err, result){
            //console.log(result);
            if(!err) resolve(result);
            else reject('Armor must be Unique.');
        });
    });
};

//add Armor
exports.equip = function(username, GuardianID, wPrimary, wSpecial, wHeavy, Helmet, Gauntlets, Chest, Legs, ClassArmor, Artifacts, Ghost){
    return new Promise(function(resolve, reject){
        var post = {username:username, GuardianID:GuardianID, wPrimary:wPrimary, wSpecial:wSpecial, wHeavy:wHeavy, Helmet:Helmet, Gauntlets:Gauntlets, Chest:Chest, Legs:Legs, ClassArmor:ClassArmor, Artifacts:Artifacts, Ghost:Ghost};
        connection.query("INSERT INTO equipped SET ?", post, function(err, result){
            //console.log(result);
            if(!err) resolve(result);
            else reject('Could not find Armor');
        });
    });
};