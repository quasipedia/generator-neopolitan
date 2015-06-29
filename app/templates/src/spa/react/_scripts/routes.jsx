/* eslint no-unused-vars:0 */
'use strict';

var React = require('react');
var Router = require('react-router');
var HomePage = require('../_modules/home/home.jsx');
var BaseLayout = require('../_layouts/base.jsx');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={BaseLayout} path="/">
    <DefaultRoute handler={HomePage} />
  </Route>
);

module.exports = routes;
