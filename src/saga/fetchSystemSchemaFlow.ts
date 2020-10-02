import { call, delay, fork, put, select, take } from 'redux-saga/effects';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
import {AggregateRelations, SystemSchema} from '../api/types';
import {systemSchemaFetched} from '../action/systemSchemaEvents';
import {getSystemSchema} from '../api';
import {onEnqueueErrorSnackbar, onEnqueueSuccessSnackbar, onEnqueueWarningSnackbar} from './enqueueSnackbarFlow';
import {eeUiConfig, updateEeUiConfigEnv} from '../config';
import * as _ from 'lodash';
import {systemSchemaSelector} from '../selector/systemSchemaSelector';

export const onFetchSystemSchema = function*(retries?: number): any {
    if(!retries) {
        retries = 0;
    }

    try {
        const currentSchema = yield select(systemSchemaSelector);

        const systemSchema: SystemSchema = yield call(getSystemSchema);

        if(JSON.stringify(currentSchema) !== JSON.stringify(systemSchema)) {
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
        }

        if(retries > 0) {
            yield call(onEnqueueSuccessSnackbar, 'Connection is back. Successfully refreshed system schema', 3000);
        }
    } catch (e) {


        // Warning Snackbar is shown for 6 sec, retries are performed for ~5secs
        if(retries < 10) {
            if(retries === 1) {
                // First retry without warning, if it fails warning is shown and a few more retries are performed
                yield call(onEnqueueWarningSnackbar, 'Loading the system schema failed. Retrying ...');
            }

            retries++;
            yield delay(500);
            yield call(onFetchSystemSchema, retries);
        } else {
            yield call(onEnqueueErrorSnackbar, 'Loading the system schema failed');
        }
    }
};

export function* fetchSystemSchemaFlow() {
    while (true) {
        yield take(fetchSystemSchema.toString());

        yield fork(onFetchSystemSchema);
    }
}
