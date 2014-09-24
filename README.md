## Skiplist
========

Skiplist is the prototype of the HackerQuarters site distribution tool, as part
of a broader toolchain of knowledge management utilities that are intended to
manage the considerable amount of interesting information that is consumed (as
well as generated) by the residents of our humble household (as well as our
network of friends and coworkers). Skiplist tries to fill the gap existing
between the process of saving, sharing and later accessing the details of a
particular website.

Simply click the icon that appears in the top right hand corner of your browser,
sign in, and click whenever you find something that you want to share with the
hqrhouse hackers.

#### Running the web app.
After cloning the repo, be sure to run both `npm install` and `bower install`.

See config/config.js for the mongo databases that are expected to exist.

For things to work correctly, the less and template files need to be compiled,
with `grunt less` and `grunt hogan`.  These will be run automatically by the default
`grunt` task during development.

#### Chrome Extension

Check `chrome_ext/` for instructions on building the chrome extension (otherwise
a version of the extension is built every time at `chrome_ext/dist.zip`, which
points to nxvr.org).  If you want to run the server locally you can run `npm
install` in the root of the directory and run `grunt`. (You'll need to have
node/npm installed for both).
