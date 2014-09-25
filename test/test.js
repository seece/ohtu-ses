var assert = require('assert')
    , mongoose = require('mongoose')
    , Article = mongoose.model('Article')
    

describe('Database', function() {
    it('failing test', function(){
        assert.equal(1,2);
    })
});
