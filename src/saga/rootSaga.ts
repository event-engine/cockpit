import { all, call, delay, spawn } from 'redux-saga/effects';

/**
 * Prevents the root saga from terminating entirely due to some error in another saga
 *
 * @param saga
 */
const makeRestartable = (saga: any) => {
    return function*() {
        yield spawn(function*() {
            while (true) {
                try {
                    yield call(saga);
                    console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
                } catch (e) {
                    console.error('Saga error, the saga will be restarted', e);
                }
                yield delay(1000); // Workaround to avoid infinite error loops
            }
        });
    };
};

const rootSagas: any = [
].map(makeRestartable);

export default function* rootSaga() {
    console.log('root saga started');
    yield all(rootSagas.map((saga: any) => call(saga)));
}
