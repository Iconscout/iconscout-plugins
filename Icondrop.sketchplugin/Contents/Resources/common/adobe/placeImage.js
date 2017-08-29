//var url = "https://cdn.iconscout.com/public/images/icon-pack/medium/3d-printing-3-blueprint-3d-filament-3b713a1a3bf69e1f-2017-08-11-171352-720x480.png";

function placeImage (file) {
    // Create temp directory if not exists
    var path = "" + cs.getSystemPath(SystemPath.USER_DATA) + "/com.iconscout.adobe.icondrop/";
	window.cep.fs.makedir(path);

    var url = file.url;
    var name = file.name;
    var type = file.type;
    var size = (file.type==='svg')?512:file.size;

    fetch(url).then(function(e) {
        return e.arrayBuffer()
    }).then(function(e) {
        for (var i = new Uint8Array(e), s = i.length, arr = new Array(s); s--; )
            arr[s] = String.fromCharCode(i[s]);

        var c = arr.join("");

        var fileData = null;
        /* if (type === "svg") {
        	fileData = window.btoa(unescape(encodeURIComponent(fileData)));
        } else {
            fileData = window.btoa(c);
        }*/

        fileData = window.btoa(c);

        var fileName = url.replace(/^.*[\\\/]/, '').split("?")[0];
        var file = path + fileName;

        // console.log(url, name, file);

        var result = window.cep.fs.writeFile(file, fileData, window.cep.encoding.Base64);

        if(0 == result.err) {
	        var script = 'placeImageAdobe("'+ cs.getHostEnvironment().appId +'", "' + file + '", "'+ name +'", '+size+');';
	        
	        return cs.evalScript(script, function() {
	            window.cep.fs.deleteFile(file);
	        })
        } else {
        	console.log("Error writing file");
        }

    });
}