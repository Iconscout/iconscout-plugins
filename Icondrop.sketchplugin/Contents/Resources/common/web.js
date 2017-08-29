var Storage = function () {
	
}
Storage.prototype.has = function (key) {
	return (localStorage[key] !== undefined)
}
Storage.prototype.get = function (key) {
	if(this.has(key)) {
		return localStorage[key];
	}
	return null;
}
Storage.prototype.set = function (key, value) {
	localStorage.setItem(key, value);
}
Storage.prototype.clear = function (key) {
	localStorage.clear(key);
}

Storage.prototype.getJSON = function (key) {
	if(this.has(key)) {
		return this.parseJSON(localStorage[key]);
	}
	return null;
}
Storage.prototype.putJSON = function (key, value) {
	this.set(key, JSON.stringify(value));
}
Storage.prototype.parseJSON = function (value) {
	try {
		return JSON.parse(value)
	}
	catch (e) {
		return null
	}
}

var app = app || {
	output: 'web',
	vector_file: 'svg',
	in_app_errors: true
};

app.performAction = function (action, data) {
	window.data = JSON.stringify(data);
	window.location.hash = action;
	window.location.hash = '#';

	console.log("performAction", action, data);
}

app.insertIcon = function (logo) {
	app.performAction('insertIcon', logo);
}

app.openURL = function (url) {
	window.open(url);
}

app.showMessage = function (message) {
	console.log("Message: " + message);
}

app.storage = new Storage();