/**
 * This Object manipulate the values of the Token in a HTML5 LocalStorage.
 *
 * With this class is possible to realize a easy CRUD for the Token.
 * Before use this object you nee to call the init function that initialize all
 * resources you need.
 * @type {{}}
 */
TokenModel = {
    storage : null,

    /**
     * Initialize the Local Storage
     */
    init : function() {
        TokenModel.storage = window.localStorage;
    },

    /**
     * Save the token in the Local Storage
     * @param token string
     */
    saveToken : function(token) {
        TokenModel.storage.setItem('token', token);
    },

    /**
     * Delete the Token from the Local Storage
     */
    removeToken : function() {
        TokenModel.storage.removeItem('token');
    },

    /**
     * Get the token Value from the Local Storage
     * @returns string
     */
    getToken : function() {
        return TokenModel.storage.getItem('token');
    },

    /**
     * Update the token Value in the Local Storage
     * @param token string
     */
    updateToken : function(token) {
        TokenModel.storage.setItem('token', token);
    }
};
