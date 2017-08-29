function openURL (url) {
	NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
}