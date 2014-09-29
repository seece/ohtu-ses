var assert = require('assert')
	, should = require('should')	
    , mongoose = require('mongoose')
	, article_model = require('../app/models/article')
    , Article = mongoose.model('Article')
    

describe('ArticleDatabase', function() {
	before(function (done) {
			done();
		});

    it('should instantiate an Article object', function() {
		var article = new Article({
			author : ["mluukkai"],
			title : "Java-maailman kirot",
			year : 1995,
			booktitle : "kirjan otsikko",
			publisher : "Arktinen Banaani"
		});

		article.author.length.should.equal(1);
		article.author[0].should.equal("mluukkai");
		article.should.have.property('title', "Java-maailman kirot");
		article.should.have.property('year', 1995);
		article.should.have.property('booktitle', "kirjan otsikko");
		article.should.have.property('publisher', "Arktinen Banaani");

    })

	it('should save an Article object', function() {

	})
});
