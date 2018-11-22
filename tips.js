const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();

const viewOptions = {
	root: '/Users/christopherberry/Desktop/GitHub/alex-tips/alex-tips/views'
};

var certOptions = {
	key: fs.readFileSync(path.resolve('cert/server.key')),
	cert: fs.readFileSync(path.resolve('cert/server.crt'))
};

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('new-tip.html', viewOptions);
});

// app.listen(app.get('port'), function() {
// 	console.log(
// 		'Express started on http://localhost:' +
// 			app.get('port') +
// 			'; press Ctrl-C to terminate.'
// 	);
// });

var server = https.createServer(certOptions, app).listen(443);
