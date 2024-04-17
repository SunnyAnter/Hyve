const mongoose = require('mongoose');
const conf = require('../config');

mongoose.connect(`${conf.dbUrl}/${conf.dbName}`);

module.exports = mongoose