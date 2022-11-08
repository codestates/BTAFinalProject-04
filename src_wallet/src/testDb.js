var express = require('express');
const router = express.Router();

var db_config = require('../config/config.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

conn.query("SELECT * from user where user = 'test'", (error, rows) => {
   if (error) throw error;
   console.log('User info is: ', rows);
   //res.send(rows);
});



module.exports = router;