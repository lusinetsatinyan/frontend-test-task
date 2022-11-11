import { TValue } from "../store/events/types"

export type TEvent = {
	appointmentId: string;
	date: string;
	id: string;
	name: string;
	resource: string;
}

export type TEventResource = {
	appointmentId?: string;
	date: string;
	id: string;
	name: string;
	resource: string;
	details: string;
	values: string[] | TValue[] | [];
	code: string | null;
}