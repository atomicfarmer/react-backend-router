var React = require('react');
var ReactDOMServer	= require('react-dom/server');
var ReactRouter = require('react-router');
var RouterContext = require('react-router').RouterContext;
var createLocation = require('history/lib/createLocation');
var express = require('express');
var exphbs = require('express-handlebars');
var routes = require('./routes')

var app = express();

var port = process.env.PORT || 3000;

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/templates');

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

			var reactHtml = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
			res.status(200).render('index.hbs', {body: reactHtml});

		} else {
			res.status(404).send('Not found')
		}
	})
})

export default app;