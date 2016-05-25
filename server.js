var React = require('react');
var ReactDOMServer	= require('react-dom/server');
var ReactRouter = require('react-router');
var RouterContext = require('react-router').RouterContext;
var createLocation = require('history/lib/createLocation');
var express = require('express');
var routes = require('./routes')

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Server listening on: ' + port);
});

app.use((req, res) => {

	var location = createLocation(req.url);

	ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			res.status(200).send(ReactDOMServer.renderToString(<RouterContext {...renderProps} />))
		} else {
			res.status(404).send('Not found')
		}
	})
})

export default app;