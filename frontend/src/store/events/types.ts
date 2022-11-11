import {
	FETCH_EVENTS_REQUEST,
	FETCH_EVENTS_SUCCESS,
	FETCH_EVENTS_FAILURE,
	FETCH_RESOURCES_REQUEST,
	FETCH_RESOURCES_SUCCESS,
	FETCH_RESOURCES_FAILURE, RESET_STORE,
} from "./actionTypes";

export interface IItems {
	id: string;
	appointmentId: string;
	name: string;
	resource: string;
	date: string;
}

export interface IEvents {
	items?: IItems[]
}

export interface IRes {
	items?: IResources[]
}

export type TValue = {
	value?: number;
	unit?: string;
}

export interface IResources {
	id: string;
	details: string;
	values: string[] | TValue[] | [];
	code: string | null;
}

export interface EventsState {
	pending: boolean;
	events: IEvents | {};
	resources: IResources[];
	error: string | null;
}

export interface FetchEventsSuccessPayload {
	events: IEvents;
}

export interface FetchResourceSuccessPayload {
	resources: IResources[];
}

export interface FetchEventsFailurePayload {
	error: string;
}

export interface FetchResourcesFailurePayload {
	error: string;
}

export interface FetchEventsRequest {
	type: typeof FETCH_EVENTS_REQUEST;
}

export interface ResetStore {
	type: typeof RESET_STORE
}

export type FetchEventsSuccess = {
	type: typeof FETCH_EVENTS_SUCCESS;
	payload: FetchEventsSuccessPayload;
};

export type FetchEventsFailure = {
	type: typeof FETCH_EVENTS_FAILURE;
	payload: FetchEventsFailurePayload;
};

// export type TResourcesReq = {
//   type: typeof FETCH_RESOURCES_REQUEST;
//   ids: string[];
// }

export interface FetchResourcesRequest {
	type: typeof FETCH_RESOURCES_REQUEST;
	ids: string[]
}

export type FetchResourcesSuccess = {
	type: typeof FETCH_RESOURCES_SUCCESS;
	payload: FetchResourceSuccessPayload;
};

export type FetchResourcesFailure = {
	type: typeof FETCH_RESOURCES_FAILURE;
	payload: FetchEventsFailurePayload;
};

export type EventsActions =
	| FetchEventsRequest
	| FetchEventsSuccess
	| FetchEventsFailure
	| FetchResourcesRequest
	| FetchResourcesSuccess
	| FetchResourcesFailure
	| ResetStore;
