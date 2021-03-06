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
var getTestObject = function() {
    var obj = {
		author : "mluukkai, avihavai", //Note this is not an object yet, a string that will be split in /articles route
		title : "Java-maailman kirot",
		year : 1995,
		booktitle : testBookTitle,
		publisher : "Arktinen Banaani"
    };

    return obj;
}

var logErr = function(error, response, body){
    if(err)
    {
        console.log("error: " + err);
    }
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
		var article = getTestArticle();
	article.title = Array(5000).join("x");
	article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object with empty book title", function(done) {
		var article = getTestArticle();
	article.booktitle = "";
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object with 5000 char book title", function(done) {
		var article = getTestArticle();
	article.booktitle = Array(5000).join("x");
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object with empty publisher", function(done) {
		var article = getTestArticle();
		article.publisher = "";
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object with 5000 publisher", function(done) {
		var article = getTestArticle();
	article.publisher = Array(5000).join("x");
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object negative year", function(done) {
		var article = getTestArticle();
		article.year = -1;
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})
	
	it("shouldn't save an Article object with year 4001", function(done) {
		var article = getTestArticle();
		article.year = 4001;
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})

	it("shouldn't save an Article object without any authors", function(done) {
		var article = getTestArticle();
		article.author = [];
		article.save(function (err, docs) {
		(err !== null).should.be.true;
		done();
		});
	})


});

describe('ArticleHTTP', function() {
	it('should load a page when requesting to see all articles', function(done) {
		agent
		.get('/search/')
		.expect('Content-Type', /html/)
		.expect(/search/)
		.expect(200)
		.end(done)
	});

	it('should have a link to reference listing on index page', function(done) {
		agent
		.get('/')
		.expect('Content-Type', /html/)
		.expect(/all references/)
		.expect(200)
		.end(done)
	});

	it("should have a link to 'add new article form'", function(done) {
		agent
		.get('/')
		.expect('Content-Type', /html/)
		.expect(/new article reference/)
		.expect(200)
		.end(done)
	});
});

describe('PostNewArticle', function() {

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

    it("shouldn't save a new article with erroneous post data", function(done) {

        var obj = {};
        obj.year = 4001; 

        
        request(app).post('/articles/').send(obj).end(function(err, res) {

            var query = Article.find({booktitle : testBookTitle});

            query.exec(function(err,docs) {
                docs.length.should.be.exactly(0);
                done();
            });
        });
    });

    it("should save a new article when posting to /articles", function(done) {

        request(app).post('/articles/').send(getTestObject()).end(function(err, res) {

            var query = Article.find({booktitle : testBookTitle});

            query.exec(function(err,docs) {
                docs.length.should.be.exactly(1);
                docs[0].booktitle.should.be.exactly(testBookTitle);
                done();
            });
        });

    });
    //TODO: add tests for checking if trimming spaces from multiple authors works
    //TODO: add tests for checking if both one author and multiple authors work

});


			//Article.find({booktitle : testBookTitle}).remove().exec();
