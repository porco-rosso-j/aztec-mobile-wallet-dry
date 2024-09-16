"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _account_interface = require("./account_interface.js");
Object.keys(_account_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _account_interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _account_interface[key];
    }
  });
});
var _account_contract = require("./account_contract.js");
Object.keys(_account_contract).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _account_contract[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _account_contract[key];
    }
  });
});