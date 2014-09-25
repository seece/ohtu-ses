{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "name": "Article",
  "type": "object",
  "properties": {
    "author": {
      "type": "array",
      "minItems": 1,
      "items": { "type": "string" },
      "required": true
    },
    "title": {
      "type": "string",
      "required": true
    },
    "year": {
      "type": "number",
      "required": true
    },
    "booktitle": {
      "type": "string",
      "required": false
    },
    "publisher": {
      "type": "string",
      "required": false
    }
  }
}