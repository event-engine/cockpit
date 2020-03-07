
export const dashboardPath = '/dashboard';
export const aggregatePath = '/aggregates/:aggregateType';
export const aggregateDetailsPath = '/aggregates/:aggregateType/:aggregateId';

export const makeAggregateUrl = (aggregateType: string) => aggregatePath.replace(':aggregateType', aggregateType);
export const makeAggregateDetailsUrl = (aggregateType: string, aggregateId: string) =>
    aggregateDetailsPath.replace(':aggregateType', aggregateType).replace(':aggregateId', aggregateId);
