/* eslint-disable @typescript-eslint/no-explicit-any */
type FormEventHandler<T extends EventTarget> = (
	event: Event & {
		currentTarget: EventTarget & T;
	}
) => any;
export type MouseEventHandler<T extends EventTarget> = (
	event: MouseEvent & {
		currentTarget: EventTarget & T;
	}
) => any;
