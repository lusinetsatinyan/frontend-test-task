import {
	FETCH_EVENTS_FAILURE,
	FETCH_EVENTS_REQUEST,
	FETCH_EVENTS_SUCCESS,
	FETCH_RESOURCES_FAILURE,
	FETCH_RESOURCES_REQUEST,
	FETCH_RESOURCES_SUCCESS,
	RESET_STORE,
} from "./actionTypes";

import {EventsActions, EventsState} from "./types";

const initialState: EventsState = {
	pending: false,
	events: [],
	resources: [],
	error: null,
};

const state = (state = initialState, action: EventsActions) => {
	switch (action.type) {
		case FETCH_EVENTS_REQUEST:
			return {
				...state,
				pending: true,
			};
		case FETCH_EVENTS_SUCCESS:
			return {
				...state,
				pending: false,
				events: action.payload.events,
				error: null,
			};
		case FETCH_EVENTS_FAILURE:
			return {
				...state,
				pending: false,
				events: [],
				error: action.payload.error,
			};
		case FETCH_RESOURCES_REQUEST:
			return {
				...state,
				pending: true,
			};
		case FETCH_RESOURCES_SUCCESS:
			return {
				...state,
				pending: false,
				resources: state.resources
					? [...state.resources, ...action.payload.resources]
					: action.payload.resources,
				error: null,
			};
		case FETCH_RESOURCES_FAILURE:
			return {
				...state,
				pending: false,
				events: [],
				error: action.payload.error,
			};
		case RESET_STORE:
			return {
				pending: false,
				events: [],
				resources: [],
				error: null,
			}
		default:
			return {
				...state,
			};
	}
};

export default state