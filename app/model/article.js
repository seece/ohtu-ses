var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO load Schema json
var ArticleSchema = new Schema({});

ArticleSchema.methods = {
}

ArticleSchema.statics = {
}

mongoose.model('Article', ArticleSchema);
