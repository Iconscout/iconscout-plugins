function placeFile (file, context) {
    var fileUrl = file.url;
    var name = file.name;

    // Reference to all the documents, pages, and selection
    var api = context.api();
    var doc = api.selectedDocument;
    var page = doc.selectedPage;

    var selection = doc.selectedLayers;
    var artboard = page._object.currentArtboard();

    // Canvas in which the file will be inserted
    var canvas = page;

    var layers = [];
    
    selection.iterate(function (layer) {
        layers.push(layer);
    });    

    // Get selected object if it's available
    var selectedObject = layers.length ? layers[0] : null;

    var url = [[NSURL alloc] initWithString: fileUrl];

    // Import SVG or Image
    if(file.type === 'svg') {
        var svgImporter = MSSVGImporter.svgImporter();
        svgImporter.prepareToImportFromURL(url);
        var importedLayer = svgImporter.importAsLayer();

        // Set name of Layer
        importedLayer.name = name;

        // Store SVG Size for resizing
        var size = importedLayer.frame();
        
        // Decide the frame of the frame based on selected object or default frame (location and size)
        var frame = getFrameSizing(size.width(), size.height(), selectedObject, api);
            
        size.setWidth(frame.width);
        size.setHeight(frame.height);
        size.setX(frame.x);
        size.setY(frame.y);
        
        // Add SVG to the Canvas
        var canvas = artboard || page._object;
        canvas.addLayer(importedLayer);
    }
    else {

        // Fetch Image
        var newImage = [[NSImage alloc] initByReferencingURL:url];
        var imageData = MSImageData.alloc().initWithImage_convertColorSpace(newImage, false);
        
        // Store Image Size for resizing
        var size = newImage.size();
        
        var frame = getFrameSizing(size.width, size.height, selectedObject, api);

        // If there is selected artboard, then we have to decide the relative position
        if(artboard) {
            var artboardFrame = artboard.frame();
            var x = artboardFrame.x();
            var y = artboardFrame.y();

            frame = new api.Rectangle(frame.x+x,frame.y+y,frame.width,frame.height);
        }
        // Create New Image in Canvas
        var image = canvas.newImage({
            frame: frame,
            name: name
        });

        // Reference Image to URL
        image.imageURL = url;
    }  

    // Remove selected object if it's shape, as the file will be replaced with the selected shape
    if(selectedObject && selectedObject.isShape) {
        selectedObject.remove();
    }  
}


// Decide the frame of the frame based on selected object or default frame (location and size)
function getFrameSizing (width, height, selectedObject, api) {

    // Default dimentions
    var rect = {
        x: 0,
        y: 0,
        width: 512,
        height: 512
    };

    // Decide the output frame dimention for reference
    var frame = (selectedObject && selectedObject.isShape) ? selectedObject.frame : rect;


    // Decide the height and width
    var ratio = width/height;

    var newWidth = frame.width;
    var newHeight = newWidth/ratio;

    if(newHeight > frame.height) {
        newHeight = frame.height;
        newWidth = newHeight*ratio;
    }

    // Decide location
    var newX = rect.x;
    var newY = rect.y;
    if (selectedObject && selectedObject.isShape) {
        var newX = frame.x + (frame.width - newWidth)/2;
        var newY = frame.y + (frame.height - newHeight)/2;
    }
    return new api.Rectangle(newX,newY,newWidth,newHeight);
}