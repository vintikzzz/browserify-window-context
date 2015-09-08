#browserify-window-context

[![NPM](https://nodei.co/npm/browserify-window-context.png?downloads=true&stars=true)](https://nodei.co/npm/browserify-window-context/)

### Adds Window context to shimed module
By default in a shimed module `this` points to empty `Object` that makes a lot of  non-CommonJS modules fail. This browserify transformation replaces `this` with `Window` and script runs as expected.

#### package.json

```json
{
  "main": "./js/entry.js",
  "browser": {
    "old_good_script": "./js/vendor/old_good_script.js"
  },
  "browserify-shim": {
  },
  "browserify-window-context": [
    "old_good_script"
  ],
  "browserify": {
    "transform": [ "browserify-window-context", "browserify-shim" ]
  },
  "dependencies": {
    "browserify-shim": "~3.2.0",
    "browserify-window-context": "~0.1.0"
  }
}
```

## Installation

    npm install browserify-window-context

## How it works
It simply wraps your script with another function and applies new Window context like so:

    (function () {' + data + '}).apply(window);
