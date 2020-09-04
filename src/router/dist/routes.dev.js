"use strict";

var _interopRequireDefault = require("/home/local/TENSOR-CORP/subbotin/work/quasar/demo/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("/home/local/TENSOR-CORP/subbotin/work/quasar/demo/node_modules/@babel/runtime/helpers/interopRequireWildcard"));

var routes = [{
  path: '/',
  component: function component() {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require('layouts/MainLayout.vue'));
    });
  }
}, {
  path: '/',
  component: function component() {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require('layouts/DrawerLayout.vue'));
    });
  },
  children: [{
    path: '2',
    component: function component() {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2.default)(require('pages/Table.vue'));
      });
    }
  }]
}, {
  path: '/',
  component: function component() {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require('layouts/DrawerLayout.vue'));
    });
  },
  children: [{
    path: 'login',
    component: function component() {
      return Promise.resolve().then(function () {
        return (0, _interopRequireWildcard2.default)(require('pages/Login.vue'));
      });
    }
  }]
}, // Always leave this as last one,
// but you can also remove it
{
  path: '*',
  component: function component() {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require('pages/Error404.vue'));
    });
  }
}];
var _default = routes;
exports.default = _default;