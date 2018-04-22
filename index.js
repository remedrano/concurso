// index.js
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9000))
app.listen(app.get('port'));
