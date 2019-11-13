"use strict";
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var currencies_1 = require("../converter/currencies");
exports.ValidateConverter = function (params) {
    var validator = new class_validator_1.Validator();
    return validator.isPositive(+params.sum)
        && validator.isIn(params.currencyFrom, Object.keys(currencies_1.Currency))
        && validator.isIn(params.currencyFrom, Object.keys(currencies_1.Currency));
};
