var mongoose = require('mongoose')
    , Article = mongoose.model('Article');

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
        res.render("article", function(err, html){
            res.send(html);
        });
		//res.send("GET articles");
	});

	app.get('/articles/:id', function(req, res){
		res.send("GET single article" + req.params.id);
	});

	app.post('/articles', function(req, res){

        var obj = req.body;
        var authors = req.body.author.split(",");
        authors.map(Function.prototype.call, String.prototype.trim);
        obj.author = authors;
        var article = new Article(obj);
        article.save(function(err,docs) {
            if(err !== null)
            {
                console.log("failed submit: " + err);
                res.redirect('/articles');    
            }
            else
            {
                console.log("succesful submit");
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
