'use strict';

var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
                                     title:         String,
                                     owner:         String,
                                     thumbnail:     String
                                 });

module.exports = mongoose.model('Book', bookSchema);