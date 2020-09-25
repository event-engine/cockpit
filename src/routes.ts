
export const dashboardPath = '/dashboard';
export const queriesPath = '/queries';
export const executeQueryPath = '/queries/:query';
export const commandsPath = '/commands';
export const executeCommandPath = '/commands/:command';
export const aggregatePath = '/aggregates/:aggregateType';
export const aggregateDetailsPath = '/aggregates/:aggregateType/:aggregateId/:version?';

export const makeExecuteQueryPath = (query: string) => executeQueryPath.replace(':query', query);
export const makeExecuteCommandPath = (command: string) => executeCommandPath.replace(':command', command);
export const makeAggregateUrl = (aggregateType: string) => aggregatePath.replace(':aggregateType', aggregateType);
export const makeAggregateDetailsUrl = (aggregateType: string, aggregateId: string, version?: number) =>
    aggregateDetailsPath
        .replace(':aggregateType', aggregateType)
        .replace(':aggregateId', aggregateId)
        .replace('/:version?', version ? `/${version}` : '');
