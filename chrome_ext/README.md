# Skiplist Chrome Extension

[![Build Status](https://secure.travis-ci.org/hackerhouse/skiplist.png)](http://travis-ci.org/hackerhouse/skiplist)

## Installation

By default, the extension attempts to talk to a server at `localhost:3000`, you
can modify this to point to any publically running Skiplist instance by editing
`chrome_ext/config.json` with any details you may want to change.

(The creators of this piece of software have an instance running at
[nxvr.org](http://nxvr.org/) -- you are welcome to use it as long as you don't
abuse it.)

To build the extension, hop into your favorite terminal emulator, `cd` to the directory
this README lives in and run `grunt`

If everything went well (files concatenating, tests passing, birds singing),
you can now load skiplist by navigating to
[chrome://extensions](chrome://extensions/), opening the "Load an Unpacked
Extension" dialog and opening $SKIPLIST_DIR/chrome_ext/dist

## Changelog

### v0.2.0
- Rebuild of structure of application
- Setup Mocha + Chai
- Setup grunt to build a global configuration, as a testrunner, and so on.
- Rewrote authentication.
- Got a flashing icon (when authentication doens't pop up which sets the wrong tabID).

### v0.1.0
- Initial release

## Contributors
- Zephyr Pellerin <zv>

## License

Copyright 2013 - MIT License
