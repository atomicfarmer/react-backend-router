var React = require('react')
var Route = require('react-router').Route
var App = require('./components/app');
var Products = require('./components/Products');

module.exports = [
  <Route path="/" component={App}></Route>,
  <Route path="/products" component={Products}></Route>
]