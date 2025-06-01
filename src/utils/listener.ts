import { active_field, set_active_field_value } from "$/shared/active-field";
import { timer_store } from "$/shared/timer-store";
import { isKeyHotkey } from "is-hotkey";
import { get } from "svelte/store";

export const keyListener = (event: KeyboardEvent) => {
	event.preventDefault();
	if (isKeyHotkey("esc", event)) {
		timer_store.update(({ count, paused }) => ({
			count: count,
			paused: !paused
		}));
	} else if (isKeyHotkey("mod+z", event)) {
		console.log("Undo key pressed");
		timer_store.update(({ count, paused }) => ({
			count: count - 1,
			paused: paused
		}));
	} else if (isKeyHotkey("mod+shift+z", event)) {
		console.log("Redo key pressed");
		timer_store.update(({ count, paused }) => ({
			count: count + 1,
			paused: paused
		}));
	} else if (isKeyHotkey("mod+shift+r", event)) {
		// Reset key pressed
		console.log("Redo key pressed");
	} else if (isKeyHotkey(["arrowup", "w"], event)) {
		// Arrow up key pressed
		active_field.update((state) => ({
			column: state.column,
			row: Math.max(0, state.row - 1)
		}));
	} else if (isKeyHotkey(["arrowdown", "s"], event)) {
		// Arrow down key pressed
		active_field.update((state) => ({
			column: state.column,
			row: Math.min(8, state.row + 1)
		}));
	} else if (isKeyHotkey(["arrowleft", "a"], event)) {
		// Arrow left key pressed
		active_field.update((state) => ({
			column: Math.max(0, state.column - 1),
			row: state.row
		}));
	} else if (isKeyHotkey(["arrowright", "d"], event)) {
		// Arrow right key pressed
		active_field.update((state) => ({
			column: Math.min(8, state.column + 1),
			row: state.row
		}));
	} else if (isKeyHotkey(["backspace", "delete"], event)) {
		// Backspace key pressed
		active_field.update((state) => ({
			column: state.column,
			row: state.row,
			value: ""
		}));
	} else if (isKeyHotkey(["1", "2", "3", "4", "5", "6", "7", "8", "9"], event)) {
		// Number key pressed

		const value = Number(event.key);

		const timer = get(timer_store);

		/** If timer stopped, then disable input */
		if (timer.paused) return false;
		/** Check if `value` is number */
		if (Number.isNaN(value)) return false;

		set_active_field_value(value, get(active_field));

		active_field.update((state) => ({
			column: state.column,
			row: state.row,
			value: value
		}));
	}
};
