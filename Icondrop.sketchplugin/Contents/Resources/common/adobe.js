function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
}

// CSInterface Object Global
cs = null;

// Include Scripts
/* getScript('./js/polyfill.min.js', function () {
	
}); */
getScript('./common/adobe/CSInterface.js', function () {
	cs = new CSInterface();

	// Load Manifest
	getScript('./common/adobe/manifest.js', function () {
		loadManifest();
	});
});
getScript('./common/adobe/placeImage.js', function () {
	
});

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
	output: 'adobe',
	vector_file: 'svg',
	in_app_errors: true
};

app.insertIcon = function (file) {
	placeImage(file);
}

app.openURL = function (url) {
	cs.openURLInDefaultBrowser(url);
}

app.showMessage = function (message) {
	console.log("Message: " + message);
}

app.storage = new Storage();