var express = require('express');

var app = express();
var development = express();

app.use(express.static('./dist/'));
development.use(express.static('./app/'));

app.listen(3000,()=>{
  console.log('Production version is running on port 3000');
});

development.listen(3001, ()=>console.log('Development server is running on port 3001'));
