import { createSelector } from "reselect";
import {IEvents, IResources} from "./types";

type TEvent = {
	pending: boolean;
	events: IEvents;
	resources: IResources[];
	error: string | null;
}

type TEventState = {
	event: TEvent;
}

const getEvents = (state: TEventState) => state.event.events;
const getResources = (state: TEventState) => state.event.resources;

export const getEventsSelector = createSelector(getEvents, (events) => {
	if (!events.items) return []

	return events?.items.filter((item) => item.appointmentId).sort(function(a: any, b: any) {
		const keyA = new Date(a.date);
		const keyB = new Date(b.date);
		if (!a.appointmentId || !b.appointmentId) return 0;
		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	}).concat(events.items.filter((item) => !item.appointmentId));
});
export const getResourcesSelector = createSelector(getResources, (resources) => resources);