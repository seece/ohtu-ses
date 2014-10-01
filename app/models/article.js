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
Article.schema.path('title').validate(function (title) {
	return title.length > 0 && title.length < 1000;	
}, 'Invalid title');




