import { call, fork, put, take } from 'redux-saga/effects';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
import {AggregateRelations, SystemSchema} from '../api/types';
import {systemSchemaFetched} from '../action/systemSchemaEvents';
import {getSystemSchema} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {eeUiConfig, updateEeUiConfigEnv} from '../config';
import * as _ from 'lodash';

export const onFetchSystemSchema = function*() {
    try {
        const systemSchema: SystemSchema = yield call(getSystemSchema);
        yield put(systemSchemaFetched({ systemSchema }));

        const config = eeUiConfig();
        const aggregateConfig: {[aggregateType: string]: AggregateRelations} = _.clone(config.env.aggregateConfig);
        for(const aggregate of systemSchema.aggregates) {
            const userDefinedRelations = aggregateConfig[aggregate.aggregateType] || {};
            if(aggregate.relations) {
                aggregateConfig[aggregate.aggregateType] = {...aggregate.relations, ...userDefinedRelations};
            }
        }
        updateEeUiConfigEnv({aggregateConfig});

    } catch (e) {
        yield call(onEnqueueErrorSnackbar, 'Loading the system schema failed');
    }
};

export function* fetchSystemSchemaFlow() {
    while (true) {
        yield take(fetchSystemSchema.toString());

        yield fork(onFetchSystemSchema);
    }
}
