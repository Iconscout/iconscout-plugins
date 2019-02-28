var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function EventEmitter () {}

// By default, a maximum of 10 listeners can be registered for any single event.
EventEmitter.defaultMaxListeners = 10

// Shortcuts to improve speed and size
var proto = EventEmitter.prototype

proto._maxListeners = EventEmitter.defaultMaxListeners

function indexOfListener (listeners, listener) {
  var i = listeners.length
  while (i--) {
    if (listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

function alias (name) {
  return function aliasClosure () {
    return this[name].apply(this, arguments)
  }
}

function isValidListener (listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

proto._getListeners = function _getListeners (evt) {
  var events = this._getEvents()

  return events[evt] || (events[evt] = [])
}

proto._getEvents = function _getEvents () {
  return this._events || (this._events = {})
}

/*
  Alias for emitter.on(eventName, listener).
*/
proto.addListener = alias('on')

/*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
proto.emit = function emit (evt) {
  var args = Array.prototype.slice.call(arguments, 1)
  var listeners = this._getListeners(evt) || []
  var listener
  var i
  var key
  var response

  for (i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.once === true) {
      this.removeListener(evt, listener.listener)
    }

    response = listener.listener.apply(this, args || [])
  }

  return listeners.length > 0
}

/*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
proto.eventNames = function eventNames () {
  var events = this._getEvents()
  return Object.keys(events)
}

/*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
proto.getMaxListeners = function getMaxListeners() {
  return this._maxListeners
}

/*
  Returns the number of listeners listening to the event named eventName.
*/
proto.listenerCount = function listenerCount(eventName) {
  return this._getListeners(eventName).length
}

/*
  Returns a copy of the array of listeners for the event named eventName.
*/
proto.listeners = function listeners(eventName) {
  return this._getListeners(eventName).map(function (wrappedListener) {
    return wrappedListener.listener
  })
}

/*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.on = function on (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.push(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.once = function once (evt, listener) {
  return this.on(evt, {
    listener: listener,
    once: true
  })
}

/*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependListener = function prependListener (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.unshift(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependOnceListener = function prependOnceListener (evt, listener) {
  return this.prependListener(evt, {
    listener: listener,
    once: true
  })
}

/*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeAllListeners = function removeAllListeners (evt) {
  var events = this._getEvents()

  if (typeof evt === 'string') {
    // Remove all listeners for the specified event
    delete events[evt]
  } else {
    // Remove all listeners in all events
    delete this._events
  }

  return this
}

/*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeListener = function removeListener (evt, listener) {
  var listeners = this._getListeners(evt)

  var index = indexOfListener(listeners, listener)

  if (index !== -1) {
    listeners.splice(index, 1)

    this.emit('removeListener', evt, listener)
  }

  return this
}

/*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.setMaxListeners = function setMaxListeners (n) {
  this._maxListeners = n
  return this
}

/*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
proto.rawListeners = function rawListeners (evt) {
  return this._getListeners(evt).slice()
}

module.exports = EventEmitter


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SketchPluginLog = __webpack_require__(20);

var _SketchPluginLog2 = _interopRequireDefault(_SketchPluginLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var logger = new _SketchPluginLog2['default']();

exports['default'] = logger;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Context Helper
var updateContext = function updateContext(context) {
  var doc = NSDocumentController.sharedDocumentController().currentDocument();

  if (MSApplicationMetadata.metadata().appVersion > 41.2) {
    var selection = doc.selectedLayers().layers();
  } else {
    var selection = doc.selectedLayers();
  }

  return Object.assign({}, context, {
    document: doc,
    selection: selection
  });
};

exports["default"] = updateContext;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(25)
  var sketchDebugger = __webpack_require__(27)
  var actions = __webpack_require__(29)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  _logger2['default'].setContext(context).setLogPrefix('Icondrop');

  // const urls = [
  //   'https://cdn.worldvectorlogo.com/logos/semaphore.svg',
  //   'https://cdn.worldvectorlogo.com/logos/facebook-messenger.svg',
  //   'https://cdn.worldvectorlogo.com/logos/wechat.svg',
  //   'https://cdn.worldvectorlogo.com/logos/facebook-icon.svg',
  //   'https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg',
  //   'https://cdn.worldvectorlogo.com/logos/instagram-2-1.svg',
  //   'https://cdn.worldvectorlogo.com/logos/viber-3.svg',
  //   'https://cdn.worldvectorlogo.com/logos/facebook-2.svg',
  //   'https://cdn.worldvectorlogo.com/logos/download-on-the-context-store-apple.svg'
  // ]

  // const svgfiles = [0,1,2,3,4,5,6,7,8].map(i => ({
  //   url: urls[i],
  //   name: 'tarun' + i,
  //   format: 'svg'
  // }))

  // insertSVGs(svgfiles, context)

  // const imgfiles = [1,2,5,40,45,50,23,63,23,12].map(i => ({
  //   url: `https://photographs-dev.s3.wasabisys.com/photo/free/thumb/${i}.jpg`,
  //   name: 'tarun',
  //   format: 'jpg'
  // }))

  // insertOrFillImage(imgfiles, context, true)

  var options = {
    identifier: 'com.iconscout.sketch.icondrop',
    alwaysOnTop: true,
    width: 380,
    height: 500,
    minWidth: 380,
    minHeight: 350,
    maxWidth: 570
  };

  var browserWindow = new _sketchModuleWebView2['default'](options);
  browserWindow.loadURL('https://sketch.iconscout.com/2.0.1/index.html');
  browserWindow.show();

  // Send Settings to Webview
  browserWindow.webContents.on('dom-ready', function () {
    _logger2['default'].log('DOM Ready');
    var settings = {
      icondrop: _settings2['default'].settingForKey('icondrop')
    };

    _logger2['default'].log('Settings sending to Webview', settings);
    browserWindow.webContents.executeJavaScript('onReceivePluginSettings(' + JSON.stringify(settings) + ')');
  });

  browserWindow.webContents.on('setKey', function (_ref) {
    var key = _ref.key,
        value = _ref.value;

    _logger2['default'].log('setKey', key, value);
    _settings2['default'].setSettingForKey(key, value);
  });
  browserWindow.webContents.on('clearKey', function (_ref2) {
    var key = _ref2.key;

    _logger2['default'].log('clearKey', key);
    _settings2['default'].setSettingForKey(key, null);
  });

  browserWindow.webContents.on('showMessage', function (message) {
    _sketch2['default'].UI.message(message);
  });

  browserWindow.webContents.on('insertSVG', function (file) {
    _logger2['default'].log('insertSVG', file);
    (0, _insert2['default'])([file], {
      force: true,
      context: context
    });
  });

  browserWindow.webContents.on('insertRaster', function (file) {
    _logger2['default'].log('insertImage', file);
    (0, _Snippets2['default'])([file], {
      force: true,
      mask: file.mask || false,
      context: context
    });
  });

  browserWindow.webContents.on('insertSVGs', function (files) {
    _logger2['default'].log('insertSVGs', files);
    (0, _insert2['default'])(files, {
      context: context
    });
  });

  browserWindow.webContents.on('insertRasters', function (files) {
    _logger2['default'].log('insertImages', files);
    (0, _Snippets2['default'])(files, {
      mask: files[0].mask || false,
      context: context
    });
  });

  browserWindow.webContents.on('openURL', function (url) {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
  });

  // context.document.showMessage("It's alive 🙌")
};

var _sketch = __webpack_require__(8);

var _sketch2 = _interopRequireDefault(_sketch);

var _settings = __webpack_require__(9);

var _settings2 = _interopRequireDefault(_settings);

var _sketchModuleWebView = __webpack_require__(10);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _insert = __webpack_require__(21);

var _insert2 = _interopRequireDefault(_insert);

var _Snippets = __webpack_require__(24);

var _Snippets2 = _interopRequireDefault(_Snippets);

var _manifest = __webpack_require__(30);

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(1)
var buildBrowserAPI = __webpack_require__(11)
var buildWebAPI = __webpack_require__(12)
var fitSubviewToView = __webpack_require__(13)
var dispatchFirstClick = __webpack_require__(14)
var setDelegates = __webpack_require__(15)

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  // Long-running script
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  // TODO: handle modal mode

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var webView = WebView.alloc().initWithFrame(
    NSMakeRect(0, 0, options.width || 800, options.height || 600)
  )
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  if (options.webPreferences) {
    // TODO:
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents.executeJavaScript(
          dispatchFirstClick(webView, event)
        )
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    if (fiber) {
      fiber.cleanup()
    } else {
      coscript.shouldKeepAround = false
    }
  })

  threadDictionary[identifier] = panel

  if (fiber) {
    fiber.onCleanup(function() {
      if (!browserWindow._destroyed) {
        browserWindow.destroy()
      }
    })
  }

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = panel.contentView().subviews()[0]

  if (!webView) {
    throw new Error('The NSPanel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url = __command
          .pluginBundle()
          .urlForResourceNamed(url)
          .path()
      }
    }
    webview.setMainFrameURL(url)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setDrawsBackground(false)
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(1)

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL
  webContents.getURL = webview.mainFrameURL
  webContents.getTitle = webview.mainFrameTitle
  webContents.isDestroyed = function() {
    // TODO:
  }
  webContents.isLoading = function() {
    return webview.loading()
  }
  webContents.stop = webview.stopLoading
  webContents.reload = webview.reload
  webContents.canGoBack = webview.canGoBack
  webContents.canGoForward = webview.canGoForward
  webContents.goBack = webview.goBack
  webContents.goForward = webview.goForward
  webContents.executeJavaScript = function(script) {
    return webview.stringByEvaluatingJavaScriptFromString(script)
  }
  webContents.undo = function() {
    webview.undoManager().undo()
  }
  webContents.redo = function() {
    webview.undoManager().redo()
  }
  webContents.cut = webview.cut
  webContents.copy = webview.copy
  webContents.paste = webview.paste
  webContents.pasteAndMatchStyle = webview.pasteAsRichText
  webContents.delete = webview.delete
  webContents.replace = webview.replaceSelectionWithText
  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(16).default
var parseWebArguments = __webpack_require__(18)
var CONSTANTS = __webpack_require__(19)

// We create one ObjC class for ourselves here
var WindowDelegateClass
var FrameLoadDelegateClass

module.exports = function(browserWindow, panel, webview) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,

      // Tells the delegate that the window has been resized.
      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      // Tells the delegate that the window has been resized.
      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      // Tells the delegate that the window has been resized.
      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!FrameLoadDelegateClass) {
    FrameLoadDelegateClass = ObjCClass({
      classname: 'FrameLoadDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        lastQueryId: null,
        wasReady: 0,
      }),
      utils: null,

      // // Called when a client redirect is cancelled.
      // 'webView:didCancelClientRedirectForFrame:': function (
      //   webView,
      //   webFrame
      // ) {},

      // Called when the scroll position within a frame changes.
      'webView:didChangeLocationWithinPageForFrame:': function(webView) {
        this.utils.emit('did-navigate-in-page', [
          {},
          String(
            webView.stringByEvaluatingJavaScriptFromString(
              'window.location.href'
            )
          ),
        ])
      },

      // // Called when the JavaScript window object in a frame is ready for loading.
      // 'webView:didClearWindowObject:forFrame:': function (
      //   webView,
      //   windowObject,
      //   webFrame
      // ) {},

      // // Called when content starts arriving for a page load.
      // 'webView:didCommitLoadforFrame:': function (webView, webFrame) {},

      // // Notifies the delegate that a new JavaScript context has been created.
      // N.B - we intentionally omit the 2nd parameter (javascriptContext)
      // It was causing crashes in Sketch - possibly because of issues with converting
      // it from Objective C to Javascript
      'webView:didCreateJavaScriptContext:forFrame:': function(webView) {
        // any time there is a new js context, set a global value (on window.) to refer
        // to this frameloaddelegate class
        webView.windowScriptObject().setValue_forKey_(this, CONSTANTS.JS_BRIDGE)
      },

      // the normal way to expose a selector to webscript is with 'isSelectorExcludedFromWebScript:'
      // but that didn't work, so this is an alternative. This method gets invoked any time
      // an unknown method is called on this class by webscript
      'invokeUndefinedMethodFromWebScript:withArguments:': function(
        method,
        webArguments
      ) {
        if (String(method) !== 'callNative') {
          return false
        }

        var args = this.utils.parseWebArguments(webArguments)
        if (!args) {
          return false
        }

        this.utils.emit.apply(this, args)
        return true
      },

      // Called when an error occurs loading a committed data source.
      'webView:didFailLoadWithError:forFrame:': function(_, error) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when a page load completes.
      'webView:didFinishLoadForFrame:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
        this.utils.emit('dom-ready')
      },

      // Called when a provisional data source for a frame receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalLoadForFrame:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // Called when the page title of a frame loads or changes.
      'webView:didReceiveTitle:forFrame:': function(_, _title) {
        var title = String(_title)
        var shouldChangeTitle = true
        this.utils.emitBrowserEvent(
          'page-title-updated',
          {
            get defaultPrevented() {
              return !shouldChangeTitle
            },
            preventDefault: function() {
              shouldChangeTitle = false
            },
          },
          title
        )

        if (shouldChangeTitle && title) {
          this.utils.setTitle(title)
        }
      },

      // Called when a page load is in progress in a given frame.
      'webView:didStartProvisionalLoadForFrame:': function() {
        this.utils.emit('did-start-loading')
      },

      // Called when a frame will be closed.
      // 'webView:willCloseFrame:': function (webView, webFrame) {}

      // Called when a frame receives a client redirect and before it is fired.
      'webView:willPerformClientRedirectToURL:delay:fireDate:forFrame:': function(
        _,
        url
      ) {
        this.utils.emit('will-navigate', {}, String(url.absoluteString))
      },
    })
  }

  var frameLoadDelegate = FrameLoadDelegateClass.new()
  frameLoadDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: browserWindow.webContents.emit.bind(browserWindow.webContents),
    parseWebArguments: parseWebArguments,
  })
  // reset state as well
  frameLoadDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    lastQueryId: null,
    wasReady: 0,
  })

  webview.setFrameLoadDelegate(frameLoadDelegate)

  var windowDelegate = WindowDelegateClass.new()
  windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.emit.bind(browserWindow),
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(17);

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Sketch Plugin Log
 *
 * @class Utils
 * @classdesc A utility class for managing output to the Mac system log from your Sketch plugin.
 * @constructor
 *
 * @example
 * var logger = new SketchPluginLog();
 * logger.setPrefix('myPluginName')
 *   .setContext(sketchContext);
 *
 * // System log: simple message
 * logger.log('Hello world!');
 *
 * // System log: CocoaScript object
 * logger.logObject(myObject);
 *
 * // Write CocoaScript object to file:
 * logger.debugObject(myObject)
 *
 * Default path for debugObject is:
 * {Your plugin root path}/Sketch/debug/debug.log
 */
function SketchPluginLog() {
    this.context = null;

    this.settings = {
        logPrefix: ' ',
        debugLogPath: '/dev/null'
    };
}

/**
 * Set Log Prefix
 *
 * Sets a prefix for every log message sent to the system log file.
 *
 * @param {string} prefixString The string to use as prefix.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.setLogPrefix = function (prefixString) {
    this.settings.logPrefix = prefixString;

    return this;
};

/**
 * Set Context
 *
 * Sets the current Sketch context.
 *
 * @param {object} context An object provided by Sketch with information on the currently running app and plugin.
 * @returns {SketchPluginLog}
 * @method
 */
SketchPluginLog.prototype.setContext = function (context) {
    this.context = context;

    if ('/dev/null' == this.settings.debugLogPath) {
        this.settings.debugLogPath = this.context.scriptPath.stringByDeletingLastPathComponent() + '/debug/';
    }

    return this;
};

/**
 * Set Debug Log Path
 *
 * Sets the path to a folder where debug dumps will be created at. This is not the path to your system log.
 * See the `debugObject` method for more information.
 *
 * @param {string} logPathString The path to a folder to put log dumps in.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.setDebugLogPath = function (logPathString) {
    // Assert value is a string
    if (typeof logPathString !== 'string') {
        this.log('Log path must be a string. Called `setLogPath` with non-string value.');
        return this;
    }

    // Append a trailing slash if one isn't included
    var lastChar = url.substr(-1);
    if (lastChar != '/') {
        logPathString += '/';
    }

    // Assign value
    this.settings.debugLogPath = logpath;

    return this;
};

/**
 * Log
 *
 * Logs a simple message, prepended by the plugin name.
 *
 * @param {string} message
 * @returns {SketchPluginLog}
 * @method
 */
SketchPluginLog.prototype.log = function (message) {
    // Check Sketch context exists
    if (!this.hasOwnProperty('context') || _typeof(this.context) !== 'object') {
        log(this.settings.logPrefix + ' : ' + 'Context not set for SketchPluginLog! Set it with `setContext`');
    }

    // Assert value is a string
    if (typeof message !== 'string') {
        this.log('Message must be a string. Called `log` with non-string value.');
        return this;
    }

    this.context.api().log(this.settings.logPrefix + ' : ' + message);

    return this;
};

/**
 * Log Object
 *
 * Logs a CocoaScript object to the system log.
 * Note that this method does not dump JavaScript objects.
 *
 * If your object is too large for Console to view, use the `debugObject` to write the log to a debug file instead.
 *
 * @param obj The object to log.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.logObject = function (obj) {
    this.log('#####################################################################################');
    this.log('# Dumping object ' + obj);
    this.log('# Class: ' + obj.className());

    this.log('### Properties');
    this.log(obj['class']().mocha().properties());

    this.log('### Properties With Ancestors');
    this.log(obj['class']().mocha().propertiesWithAncestors());

    this.log('### Methods');
    this.log(obj['class']().mocha().classMethods());

    this.log('### Methods With Ancestors');
    this.log(obj['class']().mocha().classMethodsWithAncestors());

    this.log('### Instance Methods');
    this.log(obj['class']().mocha().instanceMethods());

    this.log('### Instance Methods With Ancestors');
    this.log(obj['class']().mocha().instanceMethodsWithAncestors());

    this.log('### Protocols');
    this.log(obj['class']().mocha().protocols());

    this.log('### Protocols With Ancestors');
    this.log(obj['class']().mocha().protocolsWithAncestors());

    this.log('### Tree As Dictionary');
    this.log(obj.treeAsDictionary());
    this.log('#####################################################################################');

    return this;
};

exports['default'] = SketchPluginLog;

/**
 * Debug Object
 *
 * Dumps a CocoaScript object to a `debug.log` file. This is useful for when an object dump is too large
 * for the system log viewer Console.
 *
 * @param {object} obj
 * @returns {SketchPluginLog}
 */
// SketchPluginLog.prototype.debugObject = function(obj) {
//     var newline       = "\r\n";
//     var doubleNewLine = newline + newline;

//     if ('/dev/null' == this.settings.debugLogPath || !this.settings.debugLogPath) {
//         this.log('Debug log path not set. Set it with the `setLogPath` method.');
//         return this;
//     }

//     var output = 'Dump for object:' + obj + newline + 'Class: ' + obj.class() + newline
//         + '#####################################################################################' + doubleNewLine

//         + '### Properties' + newline + obj.class().mocha().properties() + doubleNewLine

//         + '### Properties With Ancestors' + newline + obj.class().mocha().propertiesWithAncestors() + doubleNewLine

//         + '### Methods' + newline + obj.class().mocha().classMethods() + doubleNewLine

//         + '### Methods With Ancestors' + newline + obj.class().mocha().classMethodsWithAncestors() + doubleNewLine

//         + '### Instance Methods' + newline + obj.class().mocha().instanceMethods() + doubleNewLine

//         + '### Instance Methods With Ancestors' + newline + obj.class().mocha().instanceMethodsWithAncestors() + doubleNewLine

//         + '### Protocols' + newline + obj.class().mocha().protocols() + doubleNewLine

//         + '### Protocols With Ancestors' + newline + obj.class().mocha().protocolsWithAncestors() + doubleNewLine

//         + '### Tree As Dictionary' + newline + obj.treeAsDictionary() + doubleNewLine;

//     // Create debug folder if it doesn't exist
//     var debugFolderPath = this.settings.debugLogPath;
//     [[NSFileManager defaultManager] createDirectoryAtPath:debugFolderPath withIntermediateDirectories:true attributes:nil error:nil]

//     // Write log to the debug file
//     var outputNSString = [NSString stringWithFormat:"%@", output];
//     var logPath = this.settings.debugLogPath + 'debug.log';
//     [outputNSString writeToFile:logPath atomically:true encoding:NSUTF8StringEncoding error:nil];

//     return this;
// };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(0);

var _dom2 = _interopRequireDefault(_dom);

var _insertSVG = __webpack_require__(22);

var _insertSVG2 = _interopRequireDefault(_insertSVG);

var _updateContext = __webpack_require__(3);

var _updateContext2 = _interopRequireDefault(_updateContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var insertSVGs = function insertSVGs(files, _ref) {
  var context = _ref.context,
      _ref$force = _ref.force,
      force = _ref$force === undefined ? true : _ref$force;

  // Reference to all the documents, pages, and selection
  // context = updateContext(context)
  var api = context.api();
  // const { selection } = context;
  var selection = (0, _updateContext2['default'])().selection;

  if (selection.count() === 0) {
    // If it's force insert then insert image in center of screen
    if (force) {
      // Insert SVG in Current Artboard/Page
      (0, _insertSVG2['default'])(null, files[0], context);
    } else {
      // Else show message
      context.document.showMessage("Oops! Please select one or more layers to insert and try again!");
    }
  } else {
    selection.forEach(function (layer, index) {
      // If files are SVG then only Shape Layers can be filled

      if (!(layer instanceof MSRectangleShape || layer instanceof MSOvalShape || layer instanceof MSShapeGroup || layer instanceof MSLayerGroup || layer instanceof MSArtboardGroup)) {
        context.document.showMessage("Oops! Have you selected Shape or Group?", "You can insert SVGs in Shape Layers or Groups only.");
        return;
      }

      // Replace SVG with Selected Object
      (0, _insertSVG2['default'])(layer, files[index], context);
    });

    selection.forEach(function (layer) {
      layer.removeFromParent();
    });
  }
}; /* global MSShapeGroup MSLayerGroup MSArtboardGroup */
/* eslint no-underscore-dangle: 0 */
exports['default'] = insertSVGs;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getFrameSize = __webpack_require__(23);

var _getFrameSize2 = _interopRequireDefault(_getFrameSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var replaceWithSVG = function replaceWithSVG(selected, _ref, context) {
  var url = _ref.url,
      name = _ref.name;

  var fileUrl = NSURL.alloc().initWithString(url);
  var svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromURL(fileUrl);
  var importedLayer = svgImporter.importAsLayer();

  // Set name of Layer
  importedLayer.name = name;

  // Add SVG to the Artboard
  // const document = (selected && (selected._object instanceof MSDocument ? selected._object : selected) || context.api().selectedDocument);
  if (selected) {
    // Store SVG Size for resizing
    var size = importedLayer.frame();

    // Decide the frame of the frame based on selected object or default frame (location and size)
    var frame = (0, _getFrameSize2['default'])(size.width(), size.height(), selected, context);

    size.setWidth(frame.width);
    size.setHeight(frame.height);
    size.setX(frame.x);
    size.setY(frame.y);

    // Insert the SVG to the Parent
    var parent = selected.parentGroup();
    if (parent) {
      parent.addLayer(importedLayer);
    } else {
      var selectedPage = context.api().selectedDocument.selectedPage._object;
      var artboard = selectedPage.currentArtboard();
      if (artboard) {
        artboard.addLayer(importedLayer);
      } else {
        selectedPage.addLayer(importedLayer);
      }
    }
  } else {
    var _selectedPage = context.api().selectedDocument.selectedPage._object;

    // Insert SVG in Center of Screen
    var _size = importedLayer.frame();
    var contentRect = context.api().selectedDocument._object.contentDrawView().visibleContentRect();
    _size.setX(contentRect.origin.x + (contentRect.size.width - _size.width()) / 2);
    _size.setY(contentRect.origin.y + (contentRect.size.height - _size.height()) / 2);

    _selectedPage.addLayer(importedLayer);
  }
}; /* global MSSVGImporter NSURL */
/* eslint no-underscore-dangle: 0 */
exports['default'] = replaceWithSVG;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Decide the frame of the frame based on selected object or default frame (location and size)
var getFrameSizing = function getFrameSizing(width, height, selectedObject, context) {
  var api = context.api();

  // Decide the output frame dimention for reference
  var frame = selectedObject.frame();
  var frameX = frame.x();
  var frameY = frame.y();
  var frameWidth = frame.width();
  var frameHeight = frame.height();

  // Decide the height and width
  var ratio = width / height;

  var newWidth = frameWidth;
  var newHeight = newWidth / ratio;

  if (newHeight > frameHeight) {
    newHeight = frameHeight;
    newWidth = newHeight * ratio;
  }

  // Decide location
  var newX = frameX + (frameWidth - newWidth) / 2;
  var newY = frameY + (frameHeight - newHeight) / 2;
  return new api.Rectangle(newX, newY, newWidth, newHeight);
};

exports["default"] = getFrameSizing;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _updateContext = __webpack_require__(3);

var _updateContext2 = _interopRequireDefault(_updateContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// ###############################
// Array.js
// ###############################
// Pop First Element and return
var getFirstAndRemoveFromArray = function getFirstAndRemoveFromArray(array) {
  return array.splice(0, 1)[0];
};

// ###############################
// Symbols.js
// ###############################

// Check if all the select layers are of same type
// We'll fill data only if all the layers are of same class
var hasDifferentSymbols = function hasDifferentSymbols(layers) {
  _logger2['default'].log('fn: hasDifferentSymbols');

  var seenUUIDs = [];
  layers.forEach(function (layer) {
    if (layer instanceof MSSymbolInstance) {
      var uuid = layer.symbolMaster().objectID();
      if (seenUUIDs.indexOf(uuid) === -1) {
        seenUUIDs.push(uuid);
      }
    }
  });
  if (seenUUIDs.length > 1) {
    return true;
  }
  return false;
};

// Check & return First Symbol
var getFirstSymbolMaster = function getFirstSymbolMaster(layers) {
  _logger2['default'].log('fn: getFirstSymbolMaster');

  for (var i = 0; i < layers.length; i += 1) {
    if (layers[i] instanceof MSSymbolInstance) {
      var master = layers[i].symbolMaster();
      return master;
    }
  }
  return false;
};

// Filter layers in which we can fill
var filterLayersToOverrideable = function filterLayersToOverrideable(layers) {
  _logger2['default'].log('fn: filterLayersToOverrideable');

  var possible = [];

  layers.forEach(function (layer) {
    var fills = layer.style().fills();
    if (fills.count() && fills.firstObject().image()) {
      possible.push(layer);
    }
  });
  return possible;
};

// Ask user for the Layer that needs to be Filled in case of Symbols
var askForLayerToReplaceInSymbol = function askForLayerToReplaceInSymbol(master, context) {
  _logger2['default'].log('fn: askForLayerToReplaceInSymbol');

  var layersInMaster = master.children();
  var filtered = filterLayersToOverrideable(layersInMaster);
  var names = [];

  if (filtered.length === 0) {
    return null;
  }

  for (var i = 0; i < filtered.length; i += 1) {
    var name = filtered[i].name();
    names.push(name);
  }

  var inputs = names;
  var gotInput = context.api().getSelectionFromUser("Which Layer would you like to fill?", inputs, 0);
  var chosenIndex = gotInput[1];

  var targetLayer = filtered[chosenIndex];
  return targetLayer;
};

// ###############################
// Images.js
// ###############################
// Fetch Image Data from url
var fetchImageData = function fetchImageData(url) {
  _logger2['default'].log('fn: fetchImageData');

  var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var responsePtr = MOPointer.alloc().init();
  var errorPtr = MOPointer.alloc().init();

  var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr);
  if (errorPtr.value() != null) {
    print(errorPtr.value());
    return null;
  }

  var response = responsePtr.value();
  if (response.statusCode() != 200) {
    return null;
  }

  var mimeType = response.allHeaderFields()["Content-Type"];
  console.log(mimeType);
  if (!mimeType || !mimeType.hasPrefix("image/")) {
    return null;
  }

  var newImage = NSImage.alloc().initWithData(data);
  return MSImageData.alloc().initWithImage(newImage);
};

// Fill Layer with Image
var fillLayerWithImage = function fillLayerWithImage(layer, url) {
  _logger2['default'].log('fn: fillLayerWithImage');

  var imageData = fetchImageData(url);
  var fills = layer.style().fills();

  if (fills.count() === 0) {
    // Use New API to create fill
    var Style = __webpack_require__(0).Style;
    var sketch = __webpack_require__(0);
    var shape = sketch.fromNative(layer);
    shape.style.fills = [{
      color: '#c0ffee',
      fill: Style.FillType.Color
    }];
  }

  // Get First Fill
  var fill = fills.firstObject();
  fill.setFillType(4);
  fill.setImage(imageData);
  fill.setPatternFillType(1);
};
// Insert image in center of Screen
var insertImage = function insertImage(_ref, context) {
  var url = _ref.url,
      name = _ref.name;

  _logger2['default'].log('fn: insertImage');

  var selectedPage = context.api().selectedDocument.selectedPage._object;
  var image = fetchImageData(url);
  var layerImage = MSBitmapLayer.alloc().initWithFrame_image(NSMakeRect(0, 0, 500, 500), image);

  // Add to Current Page
  selectedPage.addLayer(layerImage);
  layerImage.setName(name);
  layerImage.setConstrainProportions(0);
  layerImage.frame().size = layerImage.NSImage().size();

  // Insert in Center of Screen
  var size = layerImage.frame();
  var contentRect = context.api().selectedDocument._object.contentDrawView().visibleContentRect();
  size.setX(contentRect.origin.x + (contentRect.size.width - size.width()) / 2);
  size.setY(contentRect.origin.y + (contentRect.size.height - size.height()) / 2);
};

// ###############################
// Frames.js
// ###############################
// Decide the frame of the frame based on selected object or default frame (location and size)
var getFrameFillSizing = function getFrameFillSizing(width, height, selectedObject, context) {
  _logger2['default'].log('fn: getFrameFillSizing');

  var api = context.api();

  // Decide the output frame dimention for reference
  var frame = selectedObject.frame();
  var frameX = frame.x();
  var frameY = frame.y();
  var frameWidth = frame.width();
  var frameHeight = frame.height();

  var newWidth = width;
  var newHeight = height;

  // Decide the height and width
  var ratio = width / height;
  var frameRatio = frameWidth / frameHeight;

  if (ratio > frameRatio) {
    newHeight = frameHeight;
    newWidth = newHeight * ratio;
  } else {
    newWidth = frameWidth;
    newHeight = newWidth / ratio;
  }

  // Decide location
  var newX = frameX + (frameWidth - newWidth) / 2;
  var newY = frameY + (frameHeight - newHeight) / 2;
  return new api.Rectangle(newX, newY, newWidth, newHeight);
};

// ###############################
// Masking.js
// ###############################
// Mask Layer with Image
var maskLayerWithImage = function maskLayerWithImage(layer, url) {
  _logger2['default'].log('fn: maskLayerWithImage');

  var artboard = layer.parentArtboard();
  // Place in Artboard or Page
  var placeInto = artboard ? artboard : page;

  // If it's in group then place in group
  var parentGroup = layer.parentGroup();
  if (parentGroup) {
    placeInto = parentGroup;
  }

  var image = fetchImageData(url);
  var layerImage = MSBitmapLayer['new']();
  layerImage.setImage(image);
  layerImage.frame().size = layerImage.NSImage().size();

  // layerImage.setName(name);
  layerImage.setConstrainProportions(0);

  // Set Size of Image
  var frame = layerImage.frame();
  var imageFrame = getFrameFillSizing(frame.width(), frame.height(), layer, context);
  layerImage.frame().setWidth(imageFrame.width);
  layerImage.frame().setHeight(imageFrame.height);
  layerImage.frame().setX(imageFrame.x);
  layerImage.frame().setY(imageFrame.y);

  // create group
  var groupLayer = MSLayerGroup['new']();
  groupLayer.setName(layer.name());

  layer.removeFromParent();

  // create underlying mask
  layer.setHasClippingMask(1);
  layer.style().addStylePartOfType(0);
  var layerStyle = layer.style().fills().firstObject();
  layerStyle.setFillType(0);

  groupLayer.addLayer(layer);
  groupLayer.addLayer(layerImage);

  // Add to Current Page
  placeInto.addLayer(groupLayer);

  // resize group to childrens dimension
  groupLayer.resizeToFitChildrenWithOption(1);
  groupLayer.setConstrainProportions(true);

  // remove original image layer
  // layer.removeFromParent
};

// ###############################
// Layers.js
// ###############################
// Fill Layer
var fillLayer = function fillLayer(layer, files, context, layerOverride) {
  var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  _logger2['default'].log('fn: fillLayer');

  if (layer instanceof MSSymbolInstance) {
    if (layerOverride) {
      // update the mutable dictionary
      var imageURLString = getFirstAndRemoveFromArray(files).url;
      var imageData = fetchImageData(imageURLString);

      // Get existing overrides or make one if none exists
      var newOverrides = layer.overrides();
      if (newOverrides == null) {
        newOverrides = {};
      }

      // Create mutable copy
      var mutableOverrides = NSMutableDictionary.dictionaryWithDictionary(newOverrides);
      mutableOverrides.setObject_forKey(NSMutableDictionary.dictionaryWithDictionary(newOverrides.objectForKey(0)), 0);

      // Change item in the overrides
      mutableOverrides.setObject_forKey(imageData, layerOverride.objectID());

      // Change overrides
      layer.overrides = mutableOverrides; // eslint-disable-line
    }
  } else if (layer instanceof MSLayerGroup) {
    layer.layers().forEach(function (subLayer) {
      fillLayer(subLayer, files, context);
    });
  } else {
    var _imageURLString = getFirstAndRemoveFromArray(files).url;

    if (mask) {
      _logger2['default'].log('Masking Layer ' + _imageURLString);
      maskLayerWithImage(layer, _imageURLString);
    } else {
      _logger2['default'].log('Filling Layer ' + _imageURLString);
      fillLayerWithImage(layer, _imageURLString);
    }
  }
};

// ###############################
// Index.js
// ###############################
// Fill Layer
var insertOrFillImage = function insertOrFillImage(files, _ref2) {
  var force = _ref2.force,
      _ref2$mask = _ref2.mask,
      mask = _ref2$mask === undefined ? false : _ref2$mask,
      context = _ref2.context;

  _logger2['default'].log('fn: insertOrFillImage');

  var selection = (0, _updateContext2['default'])().selection;
  var selectionLength = selection.count();

  _logger2['default'].log('Selected Layers ' + selectionLength);

  if (selectionLength > 0) {
    var layerOverride = void 0;

    if (selectionLength > 1) {
      // Check if all the Layers are same
      if (hasDifferentSymbols(selection)) {
        context.document.showMessage("Sorry! You can't fill data in different type of layers.", "Please select you have only one type of Symbol/Shape!");
        return;
      }

      // Check if the selecte layer is Symbol then ask user which Layer needs to be replaced
      var firstSymbolMaster = getFirstSymbolMaster(selection);

      // If Images are being filled then Ask for the Shape in Symbol
      if (firstSymbolMaster) {
        layerOverride = askForLayerToReplaceInSymbol(firstSymbolMaster, context);

        if (!layerOverride) {
          context.document.showMessage("Sorry! You can't fill in this Symbol.", "Please make sure that the symbol you've selected has at least one Shape with Image Fill.");
          return;
        }
      }
    }

    selection.forEach(function (layer) {
      fillLayer(layer, files, context, layerOverride, mask);
    });
  } else if (force) {
    insertImage(files[0], context);
  } else {
    context.document.showMessage("Oops! Please select one or more layers to fill and try again!");
  }
};

exports['default'] = insertOrFillImage;

// const imgfiles = [1,2,5,40,45,50,23,63,23,12].map(i => ({
//   url: `https://photographs-dev.s3.wasabisys.com/photo/free/thumb/${i}.jpg`,
//   name: 'tarun',
//   format: 'jpg'
// }))

// insertOrFillImage(imgfiles, context, true)

// const selection = context.selection;
// selection.forEach(layer => {
//   fillLayerWithImage(layer, 'https://photographs-dev.s3.wasabisys.com/photo/free/thumb/3.jpg')
// })

// selection.forEach(layer => {
//  logger.log(layer instanceof MSRectangleShape)
//  logger.log(layer.className());
//})
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(26)

module.exports.toArray = __webpack_require__(6)
module.exports.prepareStackTrace = __webpack_require__(5)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(5)
var toArray = __webpack_require__(6)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(28)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {"name":"Icondrop","identifier":"com.iconscout.sketch.icondrop","description":"Get access to 2,000,000+ Icons, Illustrations & Stock Photos right into Sketch App","version":"2.0.1.1","icon":"icon.png","homepage":"https://iconscout.com","author":"Iconscout","authorEmail":"support@iconscout.com","appcast":"https://raw.githubusercontent.com/Iconscout/icondrop/master/.appcast.xml","compatibleVersion":3,"bundleVersion":1,"commands":[{"name":"Icondrop","script":"./index.js","identifier":"icondrop","description":"Get access to 2,000,000+ Icons, Illustrations & Stock Photos right into Sketch App","icon":"icons/favicon-64x64.png","shortcut":"cmd shift i"}],"menu":{"items":["icondrop"],"isRoot":true}}

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
