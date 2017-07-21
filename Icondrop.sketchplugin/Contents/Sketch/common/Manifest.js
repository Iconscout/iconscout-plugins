@import 'common/Storage.js';

function getVersion(context) {
	var manifestPath = context.scriptPath.stringByDeletingLastPathComponent() + '/manifest.json';
	var manifest = NSData.dataWithContentsOfFile(manifestPath);
	var data = NSJSONSerialization.JSONObjectWithData_options_error(manifest, 0, null);
	return String(data.version).toString();
}

function getIdentifier(context) {
	var manifestPath = context.scriptPath.stringByDeletingLastPathComponent() + '/manifest.json';
	var manifest = NSData.dataWithContentsOfFile(manifestPath);
	var data = NSJSONSerialization.JSONObjectWithData_options_error(manifest, 0, null);
	return String(data.identifier).toString();
}

function getLiveManifest(context) {
	var manifestPath = context.scriptPath.stringByDeletingLastPathComponent() + '/manifest.json';
	var manifest = NSData.dataWithContentsOfFile(manifestPath);
	var data = NSJSONSerialization.JSONObjectWithData_options_error(manifest, 0, null);
	var appcast = String(data.appcast).toString();
	var manifest = appcast.replace('appcast.xml', 'manifest.json');
	return manifest;
}

function loadManifest(context) {
	// Store Current Version of Plugin
	var currentVersion = getVersion(context);
	Storage.put('currentVersion', currentVersion);

	// Store Live Manifest Location of Plugin
	var manifest = getLiveManifest(context);
	Storage.put('manifest', manifest);
}
