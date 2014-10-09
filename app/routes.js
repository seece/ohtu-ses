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
        res.render("article", function(err, html){
            res.send(html);
        });
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

    app.get('/find', function(req,res) {
       res.render("find", function (err, html) {
            res.send(html);
       });
    });

    app.post('/find', function(req,res) {
        var obj = req.body;
        console.log(obj);

        var findObj = {};
        findObj[obj.filter] = obj.value;
        //Article.find({obj.filter: obj.value}, function(err, docs) {
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
