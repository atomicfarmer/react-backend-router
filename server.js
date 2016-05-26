var React = require('react');
var ReactDOMServer  = require('react-dom/server');
var ReactRouter = require('react-router');
var RouterContext = require('react-router').RouterContext;
var createLocation = require('history/lib/createLocation');
var express = require('express');
var exphbs = require('express-handlebars');
var helpers = require('./utils/handlebar-helpers');
var routes = require('./routes');

var app = express();

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Server listening on: ' + port);
});

var hbs = exphbs.create({
	helpers      : helpers,
	extname      : '.hbs',
	layoutsDir   : 'templates',
	partialsDir  : 'templates/partials/'
});

app.engine('hbs', hbs.engine);
app.set('views', __dirname + '/templates')
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use((req, res) => {

	var location = createLocation(req.url);

	ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			var reactHtml = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
			res.status(200).render(renderProps.routes[0].template, {
				body: reactHtml
			});
		} else {
			res.status(404).send('Not found')
		}
	})
})

export default app;