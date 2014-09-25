var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO load Schema json
var ArticleSchema = new Schema({});

{
    author: {
      type: array,
      minItems: 1,
      items: { type: string },
      required: true
    },
    title: {
      type: string,
      required: true
    },
    year: {
      type: number,
      required: true
    },
    booktitle: {
      type: string,
      required: false
    },
    publisher: {
      type: string,
      required: false
    }
}
ArticleSchema.methods = {
}

ArticleSchema.statics = {
}

mongoose.model('Article', ArticleSchema);


