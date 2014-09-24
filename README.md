# ohtu ses BibTeX
*Based on the Heroku node.js example*

[Trello board](https://trello.com/b/byTYqc1K/bibtex)

[Travis CI page](https://travis-ci.org/seece/ohtu-ses)

A Node.js app using [Express 4](http://expressjs.com/).

This application support the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Add Heroku repository.
```sh
git remote add heroku git@heroku.com:ses-bibtex.git
```

```
$ git push heroku master
$ heroku open
```

This will not work if you don't have access rights to Heroku repository.

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
