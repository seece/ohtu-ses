var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    author: {
      type: Array,
      minItems: 1,
      items: { type: String },
      required: true
    },
    title: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    booktitle: {
      type: String,
      required: false
    },
    publisher: {
      type: String,
      required: false
    }
});

ArticleSchema.methods = {
}

ArticleSchema.statics = {
}

var Article = mongoose.model('Article', ArticleSchema);
exports = Article;

Article.schema.path('title').validate(function (value) {
	return value.length > 0 && value.length < 1000;
}, 'Invalid title.');
