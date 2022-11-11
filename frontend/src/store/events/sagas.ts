import axios, { AxiosResponse, AxiosError } from "axios";
import { SagaIterator } from 'redux-saga';
import {call, put, takeLatest} from "redux-saga/effects";

import {fetchEventsFailure, fetchEventsSuccess, fetchResourcesFailure, fetchResourcesSuccess} from "./actions";
import {FETCH_EVENTS_REQUEST, FETCH_RESOURCES_REQUEST} from "./actionTypes";
import {FetchResourcesRequest, IEvents, IItems, IResources} from "./types";

const getEvents = () => axios.post<IEvents[]>("http://localhost:5010/events");

const getResources = (ids: string[]) => {
	return axios.post<number>("http://localhost:5010/resources", {
		ids: ids
	});
}

function* fetchEventsSaga(): SagaIterator {
	try {
		const { data }: AxiosResponse<{ items: IItems[] }> = yield call(getEvents)
		yield put(
			fetchEventsSuccess({
				events: data,
			})
		);
	} catch (error) {
		fetchEventsFailure({
			error: (error as AxiosError<{ message: string }>).message,
		})
	}
}

function* fetchResourcesSaga({ ids }: FetchResourcesRequest): SagaIterator {
	try {
	 const response: AxiosResponse<{ items: IResources[] }> = yield call(getResources, ids);
	 yield put(
	  fetchResourcesSuccess({
	   resources: response.data.items
	  })
	 );
	} catch (error) {
	 fetchResourcesFailure({
	  error: (error as AxiosError<{ message: string }>).message,
	 })
	}
}


function* eventsSaga() {
	yield takeLatest(FETCH_EVENTS_REQUEST, fetchEventsSaga);
	yield takeLatest(FETCH_RESOURCES_REQUEST, fetchResourcesSaga);

}

export default eventsSaga;