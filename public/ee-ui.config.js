/**
 * This is the configuration file for the event-engine-ui.
 *
 * Through altering this file you can add some custom behavior and default configuration. Since this file is
 * included during run-time, rebuilds will not be necessary.
 */

(function(exports) {

    /* Place any methods you might need below to keep the global scope clean */


    exports.eeUiConfig = {
        /* All env props defined here can be overridden in the UI including user defined props */
        env: {
            schemaUrl: 'https://ee.local/inspectio-board/api/v1/messagebox-schema2',
            messageBoxUrl: 'https://ee.local/inspectio-board/api/v1/messagebox',
            authentication: {
                type: 'oauth2_client_credentials',
                url: 'https://url/to/auth/endpoint',
                clientId: 'id',
                clientSecret: 'secret'
            },
            aggregateConfig: {
                'InspectIO.Board': {
                    'snapshot': 'InspectIO.BoardSnapshot',
                    'latestPatch': 'InspectIO.BoardPatch',
                    'lastSnapshotVersion.userId': 'InspectIO.User',
                },
                'InspectIO.User': {
                    'ownBoards': 'InspectIO.Board',
                    'sharedBoards': 'InspectIO.Board'
                }
            }
        },

        /* Adjust the hooks below to alter the behavior of the event-engine-ui */
        hooks: {
            /*
             * This hook is called before each request to the event engine backend
             */
            preRequestHook: (request, context) => request
        }
    };
})(window);
