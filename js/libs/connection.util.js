InternetConnection = {
    connectionType : null,

    /**
     * Check if exists or not an internet connection on device
     * @returns {boolean}
     */
    checkConnectionExist : function() {
        InternetConnection.connectionType = navigator.connection.type;

        if ( InternetConnection.connectionType == Connection.NONE ) {
            return false;
        } else {
            return true;
        }
    },


    /**
     * Refresh the Type of connection the device is using and save on the propertie
     * connectionType
     */
    refreshConnectionType : function() {
        InternetConnection.connectionType = navigator.connection.type;
    }
};
