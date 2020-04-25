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

### aggregateList
```
aggregateList: {
    filterLimit: 500,
    batchSize: 30,
}
```
The `filterLimit` describes the maximum number of aggregates that are loaded from the backend when filtering the 
aggregate list. The `batchSize` describes how many of those loaded aggregates are shown per batch.

### aggregateConfig
You can use the `aggregateConfig` to configure quick-links between your aggregates. For example: 
```
'MyService.User': {
    'company': 'MyService.Company',
    'colleagues': 'MyService.User'
}
```
This would create direct links from every user to to all their colleagues as well as to their company. This enables
you to jump between aggregates by simply clicking on the property in the JSON tree.

### context
Simple key/value data that can be configured individually from within the settings dialog. These key/value pairs can
in turn be used inside your hooks as injected data.
```
context: {
    username: '...',
    password: '...'
}
```

## hooks
All hooks are optional and support async/await. 

### preRequestHook
This hook is called before each request to the event-engine backend. If you need some form of authentication, use this
hook to implement your authentication logic.
```typescript
preRequestHook: (
    request: AxiosRequestConfig,
    env: EeUiConfigEnv,
    updateEnv: (env: Partial<EeUiConfigEnv>) => void,
) => Promise<AxiosRequestConfig>
```

### postRequestHook
This hook is called after each successful request to the event engine backend
```typescript
postRequestHook: (
    response: AxiosResponse,
    env: EeUiConfigEnv,
    updateEnv: (env: Partial<EeUiConfigEnv>) => void,
) => Promise<AxiosResponse>
```

### Hook not found?
Please create an issue describing the hook you need so that we can discuss whether it makes sense to integrate this
hook into the project. 
