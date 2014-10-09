var accepted_formats = ['article']

var getArrayKeys = function (dictionary) {
	var keys = [];
	for (var key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {
			keys.push(key);
		}
	}
	return keys;
}

module.exports = {
	generate: function (type, id, fields) {
		if (accepted_formats.indexOf(type) <= -1) {
			console.log("Format " + type + " not found. Accepted are " + accepted_formats);
			return null;
		}

		var format = "@#TYPE{ #ID,\n#ITEMS }";
		var keys = getArrayKeys(fields);
		var itemlist = "";

		for (var key in fields) {
			itemlist += key + " = \"" + fields[key] + "\",\n";
		}

		var bibtex = format.replace("#ITEMS", itemlist);
		bibtex = bibtex.replace("#TYPE", type);
		bibtex = bibtex.replace("#ID", id);

		return bibtex;
	}
}
