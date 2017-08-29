function loadManifest() {
	var manifest = cs.getSystemPath(SystemPath.EXTENSION)+"/CSXS/manifest.xml";
	var result = window.cep.fs.readFile(manifest);

	// Read Current Manifest File
	if(0 === result.err) {
		var xmlString= result.data;
		var parser = new DOMParser();
		var doc = parser.parseFromString(xmlString, "application/xml");

		// Get Extension Version
		var currentVersion = doc.getElementsByTagName('ExtensionList')[0].getElementsByTagName('Extension')[0].getAttribute('Version');

		// Store Version to LocalStorage
		app.storage.set('currentVersion', currentVersion);
	}
	else {
		console.log("Error reading Manifest File");
	}
}