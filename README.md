This repository demonstrates an issue with webpack, described here.

We have a large code base with a number of different packages. We want to make each package a separate umd module.

Some of the packages are used on both the server, using node, and in the browser.

When we attempt to webpack the packages for use in node, we are trying to make sure that there is only one webpack "runtime", 
so when we build each module we are using the runtimeChunk: "single" key. That separates the runtime chunk from the main 
package chunk. We want to use the runtime that is webpacked with the consumer of the package/modules, so that setting seems like what we want.

We specify target: "node", and in the consuming package we specify the modules as externals with "commonjs2 {webpacked package}.js".
The modules are found at runtime, but the exports are not available to the consumer. When we look at the output of webpack for the 
package/module, we see that it has something like this:

```
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return exports.ids = ["library"];
exports.modules = {

/***/ "./src/library/library.js":
/*!********************************!*\
  !*** ./src/library/library.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    constructor(value) {
        this._value = value;
    }
    getValue() {
        return this._value;
    }
    square() {
        return this._value * this._value;
    }
    cube() {
        return this.square() * this._value;
    }
}
exports.Library = Library;


/***/ })

};;
});
```

The portion after ```"return exports.ids = ["library"]``` is unreachable code.

This looks like a bug in code generation to me.

The repository consists of:

1. A trivial library (in the src/library directory) from which we want to create a module.
2. A simple consumer of the library (in the src/client directory).

To see the incorrect behavior, run these commands:

```
npm run webpackmain
npm run webpacklib
npm run start.
```

If you open webpacklib.config.js and comment out the line that reads 'runtimeChunk: "single"', and repeat the webpacklib step, it runs correctly, but then has two webpack runtimes, which will lead to other problems.
