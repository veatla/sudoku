import { active_field, set_active_field_value } from "$shared/active-field";
import { timer_store } from "$shared/timer-store";
import { isKeyHotkey } from "is-hotkey";
import { get } from "svelte/store";

export const keyListener = (event: KeyboardEvent) => {
	const timer = get(timer_store);
	const paused = timer.paused;

	let handled = false;
	if (isKeyHotkey("esc", event)) {
		timer_store.update(({ count, paused: p }) => ({ count, paused: !p }));
		handled = true;
	} else if (paused) {
		// Когда пауза — остальные горячие клавиши не обрабатываем
		handled = false;
	} else if (isKeyHotkey("mod+z", event)) {
		timer_store.update(({ count, paused: p }) => ({ count: count - 1, paused: p }));
		handled = true;
	} else if (isKeyHotkey("mod+shift+z", event)) {
		timer_store.update(({ count, paused: p }) => ({ count: count + 1, paused: p }));
		handled = true;
	} else if (isKeyHotkey("mod+shift+r", event)) {
		handled = true;
	} else if (isKeyHotkey(["arrowup", "w"], event)) {
		active_field.update((state) => ({
			column: state.column,
			row: Math.max(0, state.row - 1)
		}));
		handled = true;
	} else if (isKeyHotkey(["arrowdown", "s"], event)) {
		active_field.update((state) => ({
			column: state.column,
			row: Math.min(8, state.row + 1)
		}));
		handled = true;
	} else if (isKeyHotkey(["arrowleft", "a"], event)) {
		active_field.update((state) => ({
			column: Math.max(0, state.column - 1),
			row: state.row
		}));
		handled = true;
	} else if (isKeyHotkey(["arrowright", "d"], event)) {
		active_field.update((state) => ({
			column: Math.min(8, state.column + 1),
			row: state.row
		}));
		handled = true;
	} else if (isKeyHotkey(["backspace", "delete"], event)) {
		active_field.update((state) => ({
			column: state.column,
			row: state.row,
			value: ""
		}));
		handled = true;
	} else if (isKeyHotkey(["1", "2", "3", "4", "5", "6", "7", "8", "9"], event)) {
		const value = Number(event.key);
		if (Number.isNaN(value)) {
			handled = false;
		} else {
			set_active_field_value(value, get(active_field));
			active_field.update((state) => ({
				column: state.column,
				row: state.row,
				value: value
			}));
			handled = true;
		}
	}

	if (handled) event.preventDefault();
};
