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

mongoose.model('Article', ArticleSchema);

module.exports = {
  create:   createRoute,
  delete:   function(id, query, cb){},
  read:     function(query, cb){},
  readById: function(id, query, cb){},
  update:   function(id, query, model, cb){}
};


//Dunno if these should be here?
var createRoute = function(query, model, cb){
    console.log("Got data POSTed to /articles");
    console.log(query);
    console.log(model);
    console.log(cb);
};
