var assert = require('assert')
	, should = require('should')
	, bibtex = require('../app/bibtex');


describe('BibtexExporter', function() {
	it('should not work with nonexistent reference type', function () {
		(bibtex.generate('nonexistent_type', 'jaja92', {}) === null).should.be.true;
	})

	it('should export empty article listing', function () {
		var bib = bibtex.generate('article', 'jaja92', {});
		bib.should.be.exactly("@article{ jaja92,\n }")
	})
})

