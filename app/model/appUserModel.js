'user strict';
var sql = require('./../db.js');

//User object constructor
var User = function(User){

    this.Username = User.Username;
    this.Password = User.Password;
    this.FirstName = User.FirstName;
    this.Name = User.Name;
    this.Email = User.Email;
    this.description = User.description;
    this.phone_number = User.phone_number;
    this.job = User.job
    ;

};
User.createUser = function (newUser, result) {
        sql.query("INSERT INTO Users set ?", newUser, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};
User.getUserById = function (Username,Password , result) {
        sql.query("Select * from Users where Username = ? and  Password = ?",[Username,Password] , function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
User.getAllUser = function (result) {
        sql.query("Select * from Users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Users : ', res);

                 result(null, res);
                }
            });
};
User.updateById = function(id, User, result){
  sql.query("UPDATE Users SET User = ? WHERE id = ?", [User.User, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
User.remove = function(id, result){
     sql.query("DELETE FROM Users WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= User;