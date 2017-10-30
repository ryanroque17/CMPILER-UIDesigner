var express = require('express');

var app = express();

//var bs = browserSync.create();

app.get('', function(req, res){
	res.sendfile(__dirname + '/test.html');
})

app.use('/', express.static(__dirname + '/'));




//bs.init({
//	proxy: "localhost:3000",
//	files: ['**/**']
//})

app.listen(3000, function(){
	console.log("Server started on port 3000");
})