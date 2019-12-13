
export const dashboardPath = '/dashboard';
export const aggregatePath = '/aggregates/:aggregate';

export const makeAggregateUrl = (aggregate: string) => aggregatePath.replace(':aggregate', aggregate);
