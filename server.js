var path = require('path');
var express = require('express');

var staticSiteOptions = {
    portnum: 80,
    maxAge: 0 // хранить страницы в кэше пятнадцать минут
};

// Запуск сайта:
express().use(express.static(
    path.join(__dirname, 'web'),
    staticSiteOptions
)).listen(staticSiteOptions.portnum);