import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import {sagaActions} from "./SagaActions";
import {setFlightList} from "../slices/FlightSlices";

const fetchData = (url, options) => {
    return  fetch(url, {
        method: options.method || "GET",
    })
    .then(response => response.json())
    .then(res => res)
    .catch(er => {
        console.error(er);
        return er;
    }) 
};

function* fetchFlight(action) {
    try {
        const json = yield fetchData("https://api.npoint.io/4829d4ab0e96bfab50e7", {method: 'GET'});
        console.log('json ========', json);
        const list = json.data.result;
        yield put(setFlightList(list));
    }
    catch (e) {
        console.log('error ========', e);
        yield put(setFlightList([]));
    }
}

function* actionWatcher() {
    yield takeLatest(sagaActions.FETCH_FLIGHT_DATA_SAGA, fetchFlight)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}