import {
	FETCH_EVENTS_REQUEST,
	FETCH_EVENTS_FAILURE,
	FETCH_EVENTS_SUCCESS,
	FETCH_RESOURCES_REQUEST,
	FETCH_RESOURCES_SUCCESS,
	FETCH_RESOURCES_FAILURE, RESET_STORE,
} from "./actionTypes";
import {
	FetchEventsRequest,
	FetchEventsSuccess,
	FetchEventsSuccessPayload,
	FetchEventsFailure,
	FetchEventsFailurePayload,
	FetchResourcesRequest,
	FetchResourcesSuccess,
	FetchResourcesFailure,
	FetchResourcesFailurePayload,
	FetchResourceSuccessPayload
} from "./types";

export const fetchEventsRequest = (): FetchEventsRequest => ({
	type: FETCH_EVENTS_REQUEST,
});

export const resetStore = () => ({
	type: RESET_STORE
})

export const fetchResourcesRequest = (ids: string[]): FetchResourcesRequest => ({
	type: FETCH_RESOURCES_REQUEST,
	ids,
});

export const fetchEventsSuccess = (
	payload: FetchEventsSuccessPayload
): FetchEventsSuccess => ({
	type: FETCH_EVENTS_SUCCESS,
	payload,
});

export const fetchEventsFailure = (
	payload: FetchEventsFailurePayload
): FetchEventsFailure => ({
	type: FETCH_EVENTS_FAILURE,
	payload,
});


export const fetchResourcesSuccess = (
	payload: FetchResourceSuccessPayload
): FetchResourcesSuccess => ({
	type: FETCH_RESOURCES_SUCCESS,
	payload,
});

export const fetchResourcesFailure = (
	payload: FetchResourcesFailurePayload
): FetchResourcesFailure => ({
	type: FETCH_RESOURCES_FAILURE,
	payload,
});