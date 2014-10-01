var assert = require('assert')
	, should = require('should')
    , mongoose = require('mongoose')
	, request = require('supertest')
	, app = require('../server.js')
	, agent = request.agent(app)
	, article_model = require('../app/models/article')
    , Article = mongoose.model('Article')

var testBookTitle = "TESTIKIRJA";

var getTestArticle = function() {
	return article = new Article({
		author : ["mluukkai"],
		title : "Java-maailman kirot",
		year : 1995,
		booktitle : testBookTitle,
		publisher : "Arktinen Banaani"
	});
}

describe('ArticleDatabase', function() {
	before(function (done) {
			// hacky busy loop to wait for db connection
			console.log("Waiting for db connection.");
			do {
				//console.log(mongoose.connection.readyState);
			} while (mongoose.connection.readyState < 1);

			// remove test entries
			Article.find({booktitle : testBookTitle}).remove().exec();
			done();
		});

	it('should have working database connection', function() {
		// 1 : connected, 2 : connecting
		mongoose.connection.readyState.should.above(0);
	})

    it('should instantiate an Article object', function() {
		var article = getTestArticle();

		article.should.be.ok;

		article.author.length.should.equal(1);
		article.author[0].should.equal("mluukkai");
		article.should.have.property('title', "Java-maailman kirot");
		article.should.have.property('year', 1995);
		article.should.have.property('booktitle', testBookTitle);
		article.should.have.property('publisher', "Arktinen Banaani");
    })

	it('should save an Article object', function(done) {
		var article = getTestArticle();
		article.save(function (err, docs) {
			(err === null).should.be.true;
			done();
			});

		/*
		Article.count(function (err, cnt) {
			cnt.should.equal(1);
			done();
		});
		*/
	})

	it("shouldn't save an Article object with empty title", function(done) {
		var article = getTestArticle();
		article.title = "";
		article.save(function (err, docs) {
			(err !== null).should.be.true;
			done();
			});
	})

	it("shouldn't save an Article object with 5000 char title", function(done) {
	article.title = Array(5000).join("x");
	article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

});

describe('ArticleHTTP', function() {
	it('should load a page when requesting to see all articles', function(done) {
		request(app)
		.get('/articles/')
		.expect('Content-Type', /html/)
		.expect(200)
		.end(done)
	});
});
