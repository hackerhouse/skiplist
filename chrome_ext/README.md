# Skiplist Chrome Extension

The concept of Skiplist as a HackerQuarters linksharing tool relies on having a
browser extension, which itself is the product of a longstanding discussion
between [aeschylus](https://github.com/aeschylus), [zv](https://github.com/zv),
and many other hackers as well as a longstanding HQ desire for an endogenous
"knowledge tool" & information economy for our household of 10 "hackers"  as
well as our network of friends, coworkers and others whose interests and
research we would like to stay abreast of. These various processes of saving,
sharing, organizing and accessing these pieces of media in the future is the
goal of Skiplist.

In short, this extension is simply the tool that allows you to click the icon
that appears in the top right hand corner of your browser, sign in, and click
whenever you find something that you find relevant to someone out there.

[![Build Status](https://secure.travis-ci.org/hackerhouse/skiplist.png)](http://travis-ci.org/hackerhouse/skiplist)

## Installation

By default, the extension attempts to talk to a server at `localhost:3000`, you
can modify this to point to any publically running Skiplist instance by editing
`chrome_ext/config.json` with any details you may want to change.

(The creators of this piece of software have an instance running at
[nxvr.org](http://nxvr.org/) -- you are welcome to use it as long as you don't
abuse it.)

To build the extension, hop into your favorite terminal emulator, `cd` to the
directory where README resides and simply run `grunt`. When you see `Done, No
Errors` above a few lines of timing statistics.

If everything went well (files concatenating, tests passing, birds singing),
you can now load skiplist by navigating to
[chrome://extensions](chrome://extensions/), opening the "Load an Unpacked
Extension" dialog and opening `$SKIPLIST_DIR/chrome_ext/dist`

## Changelog

### v0.3.0
  - Rewrote OAuth system to resolve issues between the Google auth endpoint
    adapter and the slew of changes to Google's OAuth system, resulting in me
    rewriting everything that was using
    [oauth2-extensions](https://code.google.com/p/oauth2-extensions/) to
    another older, more stable implementation, out of the Chromium javascript
    OAuth implementation.
  - Wrote tests covering this new aforementioned authentication layer.
  - Split code between background and foreground in a more sensible fashion.

### v0.2.0
- Rebuild of structure of application
- Setup Mocha + Chai
- Setup grunt to build a global configuration, as a testrunner, and so on.
- Got a flashing icon (when authentication doens't pop up which sets the wrong tabID).

### v0.1.0
- Initial release

## Contributors
- Zephyr Pellerin <zv>

Many others contributed to the frontend.

- Drew Winget  <aeschylus>
- Mek Karpeles <mekarpeles>
- Akhil Aryan  <akhilaryan>

No doubt, great minds such as yourself will be hacking on this project too.

## License

Copyright 2013 - MIT License
