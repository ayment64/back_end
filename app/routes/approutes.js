'use strict';
module.exports = function(app) {
var todoList = require('../controller/appController');
var UserManager = require('../controller/appUserController');
var EstateManager = require('../controller/appEstateController');
const multer = require('multer');
var pool = require('../db.js');
var path = require('path')
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + '.png');
    }

})
var upload = multer({storage: storage})
// todoList Routes
app.route('/Estates')
.get(EstateManager.list_all_Estates)
.post(EstateManager.create_a_Estate);
app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
    app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    app.route('/Users')
    .post(UserManager.create_a_User)
    .get(UserManager.list_all_Users)
    app.route('/Users/:Username/:Password')
    .get(UserManager.read_a_User)
    app.route('/test/:Imagename').get(function(req,res){
        console.log(req.params.Imagename);
        //lina t7ot i l path
        //mnin tjib itaswira
        res.sendFile(path.join(__dirname, "../../uploads/"+req.params.Imagename));
      });
    app.put('/upload', upload.single('profileImage'), (req, res, next) => {
        console.log("gfhgv");
        let filename = req.file.filename
        pool.query("UPDATE `users` SET `image`= ? WHERE `Username` =?",
        [
            filename,
            req.body.Username

      ], (err, rows, fields) => {
          if(err){
              console.log("--------")
              console.log(err);
          }
                  res.status(200);
              })
          })
          app.put('/uupload', upload.single('houseImage'), (req, res, next) => {
            console.log("gfhgv");
            let filename = req.file.filename
            pool.query("UPDATE `Estates` SET `picture`= ? WHERE `name` =?",
            [
                filename,
                req.body.name
    
          ], (err, rows, fields) => {
              if(err){
                  console.log("--------")
                  console.log(err);
              }
                      res.status(200);
                  })
              })
};

