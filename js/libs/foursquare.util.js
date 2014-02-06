/**
 * Lib with the Function to use the Foursquare API
 * @type {{apiKey: string, authUrl: string, apiUrl: string, redirectUrl: string, authenticateWithRedirect: Function, getAccessTokenFromUrl: Function}}
 */
FoursquareUtil = {
    apiKey : '',
    authUrl : 'https://foursquare.com/',
    apiUrl : 'https://api.foursquare.com/',
    redirectUrl : '',
    versionStr : null,
    appBrowser : null,

    /**
     * Initialize the FoursquareUtil
     * @param configObject [Object]
     */
    init : function(configObject) {
        if (configObject.apiKey)
            FoursquareUtil.apiKey = configObject.apiKey;

        if (configObject.authUrl)
            FoursquareUtil.authUrl = configObject.authUrl;

        if (configObject.apiUrl)
            FoursquareUtil.apiUrl = configObject.apiUrl;

        if (configObject.redirectUrl)
            FoursquareUtil.redirectUrl = configObject.redirectUrl;

        FoursquareUtil.refreshVersionStr();
    },

    /**
     * Refresh the version string of the Foursquare API to make the requests
     */
    refreshVersionStr : function() {
        var todayDate = new Date();
        var year    = todayDate.getFullYear();
        var month   = todayDate.getMonth() + 1;
        var day     = todayDate.getDate();

        FoursquareUtil.versionStr = 'v='+year.toString() + month.toString() + day.toString();
    },

    /**
     * Check if the URL of the appBrowser have the attribute "access_token".
     * If it has init a TokenModel and save the token value in the window.localstorage
     * @param event [Object]
     */
    checkTokenOnUrl : function(event) {
        if (event.url.indexOf("access_token") != -1) {
            var token = FoursquareUtil.getAccessTokenFromUrl(event.url);
            TokenModel.init();
            TokenModel.saveToken(token);
            FoursquareUtil.appBrowser.close();
            window.open('home.html','_self');
        }
    },

    /**
     * Authenticate the user and redirect him to the redirectUri
     */
    authenticateWithRedirect : function() {
        if (InternetConnection.checkConnectionExist()) {
            var url = FoursquareUtil.authUrl +
                "oauth2/authenticate?" +
                "client_id="+FoursquareUtil.apiKey+
                "&response_type=token"+
                "&redirect_uri="+encodeURIComponent(FoursquareUtil.redirectUrl);

            FoursquareUtil.appBrowser = window.open(url, '_blank', 'location=no');
            FoursquareUtil.appBrowser.addEventListener('loadstart', FoursquareUtil.checkTokenOnUrl);
        } else {
            // There is no internet connection, treat this
            //alert(STR_NO_CONNECTION);
        }

    },

    authorizeWithRedirect : function() {
        var url = FoursquareUtil.authUrl +
            "oauth2/authorize?" +
            "client_id="+FoursquareUtil.apiKey+
            "&response_type=token"+
            "&redirect_uri="+encodeURIComponent(FoursquareUtil.redirectUrl);
        window.location.href = url;
    },

    /**
     * Catch the access_token value from an URL
     * @param url string - URL that have access_token property
     * @returns string access_token
     */
    getAccessTokenFromUrl : function(url) {
        return $.url(url).fparam('access_token');
    },

    /**
     * Deal with the returns of the request made for the Foursquare API
     * Analyse the returned codes and trigger the events
     * @param resp [Object]
     */
    treatFoursquareApiResponse : function(resp) {
        var code = resp.meta.code;

        switch (code) {
            // Bad Request
            case 400 :
                $(document).trigger('bad_request');
                break;
            // Invalid Token
            case 401 :
                $(document).trigger('unauthorized');
                break;
            // No permission for the user
            case 403 :
                $(document).trigger('forbidden');
                break;
            // Not Found
            case 404 :
                $(document).trigger('not_found');
                break;
            // Wrong type of request (POST OR GET)
            case 405 :
                $(document).trigger('method_not_allowed');
                break;
            // Could not finish the request, conflict
            case 409 :
                $(document).trigger('conflict');
                break;
            // Server error, (Something is bad on foursquare server :( )
            case 500 :
                $(document).trigger('internal_server_error');
                break;
        }

        return true;
    },


    requestUserData : function(token, user_id) {
        var response = {};

        if (!user_id) {
            user_id = 'self';
        }
        if (InternetConnection.checkConnectionExist()) {
            $.ajax({
                url : FoursquareUtil.apiUrl + 'v2/users/'+user_id+'?'+ FoursquareUtil.versionStr +'&oauth_token=' + token,
                type: "GET",
                beforeSend : function() {
                    $.loader.start();
                },
                success : function(resp) {
                    if (FoursquareUtil.treatFoursquareApiResponse(resp)) {
                        response = resp.response;
                    }
                },
                complete : function() {
                    $.loader.stop();
                }
            });
        } else {
            // There is no internet connection, treat this
            //alert(STR_NO_CONNECTION);
        }

        return response;
    },

    requestUserFriends : function(token, user_id) {
        var response = {};

        if (!user_id) {
            user_id = 'self';
        }

        if (InternetConnection.checkConnectionExist()) {
            $.ajax({
                url : FoursquareUtil.apiUrl + 'v2/users/'+user_id+'/friends?' + FoursquareUtil.versionStr + '&oauth_token=' + token,
                type: 'GET',
                beforeSend : function() {
                    $.loader.start();
                },
                success : function(resp) {
                    if (FoursquareUtil.treatFoursquareApiResponse(resp)) {
                        response = resp.response;
                    }
                },
                complete : function() {
                    $.loader.stop();
                }
            });
        } else {
            // There is no internet connection, treat this
            // alert(STR_NO_CONNECTION);
        }


        return response;
    }
};