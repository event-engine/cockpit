# event-engine-ui Config

## env
The entire environment may be overridden at run-time using certain hooks. These overrides are temporary and will be 
lost after leaving the application.

Additionally, some properties can be overridden on a per-browser basis through the settings dialog. These overrides
are permanent and will be persisted in the browser storage.

### schemaUrl: string
Your schema endpoint. Make sure that your request handler is configured properly.

### messageBoxUrl: string
The url to your message box. 

## hooks
All hooks are optional and support async/await. 

### preRequestHook
This hook is called before each request to the event-engine backend. If you need some form of authentication, use this
hook to implement your authentication logic.
```
preRequestHook: (
    request: AxiosRequestConfig,
    env: EeUiConfigEnv,
    updateEnv: (env: Partial<EeUiConfigEnv>) => void,
) => Promise<AxiosRequestConfig>
```

### postRequestHook
This hook is called after each successful request to the event engine backend
```
postRequestHook: (
    response: AxiosResponse,
    env: EeUiConfigEnv,
    updateEnv: (env: Partial<EeUiConfigEnv>) => void,
) => Promise<AxiosResponse>
```
