var mongoose = require('mongoose')
    , Article = mongoose.model('Article')
	, bibtex = require('app/bibtex');

module.exports = function(app) {
	app.get('/', function(request, response) {
	  response.render('index', function(err, html){
		  response.send(html);
		  //console.log(html);
		  //console.log(err);
	  });
	})

	app.get('/search', function(req, res){
		Article.find({}, function (err, docs) {
			if (err) { 
                console.log("err: " + err);
				// TODO send flash message
				res.send(err);
				return;
			}

			console.log("find ", err, docs);
			//res.send(docs);
			res.render('search', {articles : docs});
		});
	});

	app.get('/articles', function(req, res){
        res.render("article");
		//res.send("GET articles");
	});

	app.get('/articles/:id', function(req, res){
		Article.findById(req.params.id, function (err, doc) {
			if (err) { 
				// TODO send flash message
				res.send(err);
				return;
			}

			console.log("find one", err, doc);
			//res.send(docs);
			res.render('view', {article : doc});
		});
	});

	app.post('/bibtex/:id', function(req, res){
		Article.findById(req.params.id, function (err, doc) {
			if (err) { 
				// TODO send flash message
				res.send(err);
				return;
			}

			var obj = req.body;

			console.log("bibtex target", err, doc);
			//res.send(docs);
			//res.render('', {article : doc});
			var fields = {
				author : doc.author,
				title : doc.title,
				year : doc.year,
				booktitle : doc.booktitle,
				publisher : doc.publisher
			};

			res.type('text/plain');
			res.charset = 'utf-8';
			res.send(bibtex.generate('article', obj.ref_id, fields))
		});
	});

    app.get('/find', function(req,res) {
       res.render("find");
    });

    app.get('/delete/:id', function(req,res) {
        Article.findById(req.params.id, function(err, doc) {
            if(err) {
                res.send(err);
                return;
            }

            res.render("delete", {article : doc});
        });
    });

    app.post('/delete/:id', function(req,res) {
        Article.findById(req.params.id, function(err,doc) {
            if(err)
            {
                console.log(err);
                return;
            }
        }).remove().exec();

        res.redirect("/search");
    });

    app.get('/edit/:id', function(req, res) {
        Article.findById(req.params.id, function(err,doc) {
            if(err) {
                res.send(err);
                return;
            }
            res.render("edit", {article : doc});
        });
    });

    app.post('/edit/:id', function(req, res) {
        var obj = req.body;
        console.log(obj);
        Article.findById(req.params.id, function(err,doc) {
            if(err) {
                res.send(err);
                return;
            }

            var conditions = {_id: req.params.id},
                update = {author: obj.author, title: obj.title, year: obj.year, booktitle: obj.booktitle, publisher: obj.publisher},
                options = { multi: false};

            var cb = function(err, numAffected) {
                console.log(err);
                console.log("affected: " + numAffected);
                res.redirect('/articles/' + req.params.id);
            }
            Article.update(conditions, update, options, cb);
        });
    });

    app.post('/find', function(req,res) {
        var obj = req.body;
        console.log(obj);

        var findObj = {};
        findObj[obj.filter] = obj.value;
        Article.find(findObj, function(err, docs) {
            if(err) {
                console.log(err);
                res.redirect('/find');
            }
            console.log("rendering: ", docs);
            res.render('search', {articles : docs});
        });

    });

	app.post('/articles', function(req, res){

        var obj = req.body;
        if(typeof req.body.author !== 'string'){
            console.log("tried to use something else than string as author");
            res.redirect('/articles');
            return;
        }
        var authors = req.body.author.split(",");
        authors.map(Function.prototype.call, String.prototype.trim);
        obj.author = authors;
        var article = new Article(obj);
        article.save(function(err, new_article) {
            if(err !== null)
            {
                console.log("failed submit: " + err);
                res.redirect('/articles');    
            }
            else
            {
                console.log("succesful submit with id " + new_article.id);
                res.redirect('/articles');
            }
        });
	})

	app.put('/articles/:id', function(req, res){
		res.send("PUT articles/" + req.params.id);
	})

	app.delete('/articles/:id', function(req, res){
		res.send("DELETE articles/" + req.params.id);
	})
}
