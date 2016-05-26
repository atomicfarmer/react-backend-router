var React = require('react')
var Route = require('react-router').Route
var App = require('./components/app');
var Products = require('./components/Products');

module.exports = [
  <Route path="/" template="index" component={App}></Route>,
  <Route path="/products" template="index" component={Products}></Route>
]