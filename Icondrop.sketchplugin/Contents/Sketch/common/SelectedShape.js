function selectedShape(context) {
  var selection = context.selection;
  var doc = context.document;

  if (selection.count() != 1) {
    [doc showMessage:'Please select a layer with a single shape'];
  }

  var selectedShape = [selection objectAtIndex:0];
  if (! [selectedShape isKindOfClass:[MSShapeGroup class]]) {
    [doc showMessage:'Selected layer is not a shape layer'];
    return;
  }

  return selectedShape;
}