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

// Validation

var validateStringField = function(value) {
	return value.length > 0 && value.length < 1000;	
}

Article.schema.path('title').validate(validateStringField, 'Invalid title');
Article.schema.path('booktitle').validate(validateStringField, 'Invalid booktitle');
Article.schema.path('publisher').validate(validateStringField, 'Invalid publisher');
Article.schema.path('year').validate(function (year) {
	return year > 0 && year < 3000	
}, 'Invalid year');


