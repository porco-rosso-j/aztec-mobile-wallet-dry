"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _create_account = require("./create_account.js");
Object.keys(_create_account).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _create_account[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _create_account[key];
    }
  });
});
var _configuration = require("./configuration.js");
Object.keys(_configuration).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _configuration[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configuration[key];
    }
  });
});