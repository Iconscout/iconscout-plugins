window.localData = window.localData || {};
var app = app || {};

app.performAction = (action, data) => {
	window.data = JSON.stringify(data);
	window.location.hash = action;
	window.location.hash = '#';

	console.log("performAction", action, data);
}

app.insertIcon = (logo) => {
	app.performAction('insertIcon', logo);
}

app.openURL = (url) => {
	app.performAction('openUrl', { url: url });
}

app.showMessage = (message) => {
	app.performAction('showMessage', { message: message });
}

var Storage = {
	has: function (key) {
		return window.localData.hasOwnProperty(key)
	},
	get: function (key) {
		if(this.has(key)) {
			return window.localData[key];
		}
		return null;
	},
	set: function (key, value) {
		app.performAction('putValue', { key: key, value: value });
	},
	clear: function (key) {
		app.performAction('clearValue', { key: key });
	},

	getJSON: function (key) {
		if(this.has(key)) {
			return this.parseJSON(this.get(key));
		}
		return null;
	},
	putJSON: function (key, value) {
		this.set(key, JSON.stringify(value));
	},
	parseJSON: function (value) {
		if(value instanceof Object || value instanceof Array) {
			return value;
		}

		try {
			return JSON.parse(value);
		}
		catch (e) {
			return null;
		}
	}
}

app.storage = Storage;
