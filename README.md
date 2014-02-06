# Foursquare Login with JS for Phonegap v0.2
This is a small JS Lib optimized for phonegap developers that want to use the foursquare login in their phonegap projects.

This is not a Phonegap plugin, it's a JS lib that was created for phonegap projects.

To use this lib you need to use some JS libs that is already included in the ./js/require folder and some phonegap plugins

Here are them:

### JS libs:
> *jQuery*

> *Purl*

### Phonegap Plugins:
> *Connection*

> *InAppBrowser*

## LocalStorage

The token_model.js file use the HTML5 window.localStorage o save the Token value to make the requests to foursquare api

## How to Use the Lib

First of all you need to include the jQuery, Purl libs that are in ./js/require folder,
after include them you need to include the token_model.js that is in ./js/model folder.
And in the you need to include the connection.util.js and foursquare.util.js thar are in ./js/libs

After include all the file you just need to use the functions on the Foursquare object passing all the parameters.

Later I will include a demo project and create a more detail documentation.
