const express = require('express')
const mysql = require('mysql')
const uuidv4 = require('uuid/v4'); 
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images/');
    },
    filename: function(req,file,cb){
        cb(null,uuidv4() + '.png');
    }

})
var upload = multer({storage: storage})

const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "whistle"
})

function getConnection(){
    return pool
}

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//GET_ALL
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM t_publication p ,t_stadium s WHERE p.ID_STADIUM_PUB = s.STADIUM_ID ORDER BY PUBLICATION_DATE DESC", (err, rows, fields) => {
        res.status(200)
        res.json(rows)
    })
})


//GET BY ID
router.get("/showById/:idPub", (req, res) => {
    pool.query("SELECT * FROM t_publication p ,t_stadium s WHERE p.ID_STADIUM_PUB = s.STADIUM_ID AND PUBLICATION_ID = ?",[req.params.idPub], (err, rows, fields) => {
        res.status(200)
        res.json(rows)
    })
})

//GET BY STADIUM_ID
router.get("/showByStadium/:idStadium", (req, res) => {
    pool.query("SELECT * FROM t_publication p ,t_stadium s WHERE p.ID_STADIUM_PUB = s.STADIUM_ID AND ID_STADIUM_PUB = ? ORDER BY PUBLICATION_DATE DESC ",[req.params.idStadium], (err, rows, fields) => {
        res.status(200)
        res.json(rows)
    })
})

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create Publication
router.post("/add",upload.any(), (req, res,next) => {

    let filename = req.files[0].filename; 

//------------------------------------
 pool.query("INSERT INTO t_publication (PUBLICATION_DATE, PUBLICATION_LIKES, PUBLICATION_NB_COMMENT, PUBLICATION_URL, ID_STADIUM_PUB) VALUES ( ?, ?, ?, ?, ?)", 
  [
    req.body.date,
    req.body.likes,
    req.body.comments,
    filename,
    req.body.stadium
], (err, rows, fields) => {
    if(err){
        console.log("--------")
        console.log(err);
    }
            res.status(200);
        })

    })

//PUT
//Update Publication (Likes)
router.put("/updateLikes/:idPub", (req, res) => {
    pool.query("UPDATE t_publication SET `PUBLICATION_LIKES`=? WHERE PUBLICATION_ID = ?", [
        req.body.PUBLICATION_LIKES,
        req.params.idPub
    ], (err, rows, fields) => {
        res.status(204)
        res.end();
    })
})

//PUT
//Update Publication (Nombre Commentaires)
router.put("/updateNbComment/:idPub", (req, res) => {
    pool.query("UPDATE t_publication SET `PUBLICATION_NB_COMMENT`=? WHERE PUBLICATION_ID = ?", [
        req.body.PUBLICATION_NB_COMMENT,
        req.params.idPub
    ], (err, rows, fields) => {
        res.status(204)
        res.end();
    })
})



//DELETE
//Delete Publication
router.delete("/delete/:idPub", (req, res) => {
    pool.query("DELETE FROM t_publication WHERE PUBLICATION_ID = ?", [
        req.params.idPub
    ], (err, rows, fields) => {
        res.status(204)
        res.end();
    })
})

module.exports = router;