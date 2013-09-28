/**
 This file contains any initialization logic that may need to exist for the
 chrome extension, namely

  - Global config parameters: The top level file config.json contains
  parameters that are handled by grunt-replace that change global configuration
  details, such as the remote URL used in communicating setting up skiplist
  (nxvr.org by default).

  - Namespacing: Even though we are isolated from the page (as well as from
  other scripts), this should be injected along with JQuery and give us a nicer
  application namespace to work in.

**/

var Skiplist = window.SkipList  = {};

Skiplist.remoteURL = "http://@@hostname:@@port/";
