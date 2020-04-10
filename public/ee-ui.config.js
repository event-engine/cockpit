/**
 * This is the configuration file for the event-engine-ui.
 *
 * Through altering this file you can add some custom behavior and default configuration. Since this file is
 * included during run-time, rebuilds will not be necessary.
 */

(function(exports) {

    /* Place any methods you might need below to keep the global scope clean */
    async function authenticateOAuth2ClientCredentials(authServer, clientId, clientSecret) {
        const staticData = authenticateOAuth2ClientCredentials;

        const in10Seconds = new Date((new Date()).getTime() + 10000);
        if (staticData.token && in10Seconds < staticData.validUntil) {
            return staticData.token;
        }

        const response = await fetch(authServer, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        });

        const responseData = await response.json();
        staticData.token = responseData.access_token;
        staticData.validUntil = new Date((new Date()).getTime() + responseData.expires_in * 1000);

        return responseData.access_token;
    }

    exports.eeUiConfig = {
        /* All env props defined here can be overridden in the UI including user defined props */
        env: {
            schemaUrl: 'https://ee.local/inspectio-board/api/v1/messagebox-schema2',
            messageBoxUrl: 'https://ee.local/inspectio-board/api/v1/messagebox',
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
            preRequestHook: async (request, context) => {
                const token = await authenticateOAuth2ClientCredentials(
                    'https://ee.local/auth/realms/demo/protocol/openid-connect/token',
                    'inspectio-boards',
                    ''
                );

                request.headers = {...request.headers, Authorization: `Bearer ${token}`};
                return request;
            }
        }
    };
})(window);
