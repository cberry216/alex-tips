const express = require('express');

const app = express();

const viewOptions = {
	root: '/Users/christopherberry/Desktop/GitHub/alex-tips/alex-tips/views'
};

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('new-tip.html', viewOptions);
});

app.listen(app.get('port'), function() {
	console.log(
		'Express started on http://localhost:' +
			app.get('port') +
			'; press Ctrl-C to terminate.'
	);
});
