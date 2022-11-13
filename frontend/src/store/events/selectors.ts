import {createSelector} from "reselect";
import {IEvents, IResources} from "./types";
import moment from 'moment';
import { TEvent } from "../../types";

type TEvent1 = {
 pending: boolean;
 events: IEvents;
 resources: IResources[];
 error: string | null;
}

type TEventState = {
 event: TEvent1;
}

const getEvents = (state: TEventState) => state.event.events;
const getResources = (state: TEventState) => state.event.resources;
const getPending = (state: TEventState) => state.event.pending; 

const sortEvent = (a: any,b: any) => {
 if (a.date > b.date && a.name > b.name && a.id === b.id) return -1;
 if (a.date < b.date && a.name < b.name) return 1;
 return 0
}

export const getPendingSelector = createSelector(getPending, (pending) => pending);

export const getEventsSelector = createSelector(getEvents, (events): TEvent[] => {
	if (!events.items) return []

	const eventsWithAppointmentId = events.items.filter((event) => event.appointmentId);

	const filteredEventsWithoutAppointmentId = events.items.filter((event) => !event.appointmentId).sort((a, b) => {
		const keyA = new Date(a.date);
		const keyB = new Date(b.date);

		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	});

	let newEvents: any = {};

	filteredEventsWithoutAppointmentId.forEach((fEvent) => {
		const fEventDate = moment(fEvent.date).format('YYYY-MM-DD');
		newEvents = {
		...newEvents,
		[`${fEvent.id}_${fEventDate}`]: [fEvent]
		}

		eventsWithAppointmentId.forEach((ev) => {
		const evDate = ev.date;
		if (fEvent.id === ev.appointmentId) {
			const date = moment(ev.date).format('YYYY-MM-DD');
			if (moment(fEvent.date).isSame(evDate, 'day')) {
			newEvents = {
				...newEvents,
				[`${fEvent.id}_${date}`]: [...newEvents[`${fEvent.id}_${date}`], ev].sort(sortEvent)
			}
			} else {
			newEvents = {
				...newEvents,
				[`${fEvent.id}_${date}`]: [...(newEvents[`${fEvent.id}_${date}`] || []), ev].sort(sortEvent)
			}
			}
		}
		})
	})

	const filteredData: any = {}
	Object.keys(newEvents).forEach((dataKey) => {
		newEvents[dataKey].forEach((element: any, index: number) => {
		const getAvailabelElements = () => {
			if (filteredData[dataKey] && filteredData[dataKey][element.name]) return filteredData[dataKey][element.name]
			return [];
		}
		filteredData[dataKey] = {
			...filteredData[dataKey],
			[element.name]: [...getAvailabelElements(), element]
		}
		});
	})

 	const filterByDate: any = {};

 	Object.keys(filteredData).forEach((key) => {
		Object.keys(filteredData[key]).forEach((elementKey: any) => {
			filteredData[key][elementKey].forEach((el: any) => {
				const dt = moment(el.date, "YYYY-MM-DD HH:mm:ss")
				const dateFormat = dt.format('YYYY-MM-DD:HH');

				filterByDate[`${el.name}_${dateFormat}_${el.appointmentId || 'group'}`] = [
				...(filterByDate[`${el.name}_${dateFormat}_${el.appointmentId || 'group'}`] || []),
				el
				]
			})
		});
	})

	return Object.entries(filterByDate).map((item) => item[1]).flat() as TEvent[];
});
export const getResourcesSelector = createSelector(getResources, (resources) => resources);