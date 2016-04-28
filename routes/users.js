var express = require('express');
var router = express.Router();


var users = [
  {"id":0, "username":"admin", "password":"1111"}  
];

// 관리자 로그인
router.post('/login', function(req, res, next) {
  //render('index', { title: 'jiny\'world' }
  var username = req.body.username;
  var password = req.body.password;   
  
  var notFound = true;
  for(var i = 0; i < users.length; i++)
  {
    if(users[i].username == username && 
      users[i].password == password )
      {
        notFound = false
      }
  }
  
  if( notFound )
  {
    var err = new Error('not Auth');
    err.status = 401;
    next(err);
  }
   else
    res.send("success");
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
