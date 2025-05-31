import { isKeyHotkey } from "is-hotkey";
import { timer_store } from "../store/timer_store";
import { active_field, set_active_field_value } from "../store/active_field";
import { sudoku_store } from "../store/sudoku_store";

export const keyListener = (event: KeyboardEvent) => {
    event.preventDefault();
    if (isKeyHotkey("esc", event)) {
        // timer_store(({ count, paused }) => ({
        // count: count,
        timer_store.paused = !timer_store.paused;
        // }));
    } else if (isKeyHotkey("mod+z", event)) {
        console.log("Undo key pressed");
        // timer_store.update(({ count, paused }) => ({
        timer_store.count = timer_store.count - 1;
        // paused: paused,
        // }));
    } else if (isKeyHotkey("mod+shift+z", event)) {
        console.log("Redo key pressed");
        // timer_store.update(({ count, paused }) => ({
        timer_store.count = timer_store.count + 1;
        // paused: paused,
        // }));
    } else if (isKeyHotkey("mod+shift+r", event)) {
        // Reset key pressed
        console.log("Redo key pressed");
    } else if (isKeyHotkey(["arrowup", "w"], event)) {
        // Arrow up key pressed
        // active_field.update((state) => ({
        //     column: state.column,
        active_field.row = Math.max(0, active_field.row - 1);
        // }));
    } else if (isKeyHotkey(["arrowdown", "s"], event)) {
        // Arrow down key pressed
        // active_field.update((state) => ({
        //     column: state.column,
        active_field.row = Math.min(8, active_field.row + 1);
        // }));
    } else if (isKeyHotkey(["arrowleft", "a"], event)) {
        // Arrow left key pressed
        // active_field.update((state) => ({
        active_field.column = Math.max(0, active_field.column - 1);
        // row: state.row,
        // }));
    } else if (isKeyHotkey(["arrowright", "d"], event)) {
        // Arrow right key pressed
        // active_field.update((state) => ({
        active_field.column = Math.min(8, active_field.column + 1);
        // active_field.row = active_field.row;
        // }));
    } else if (isKeyHotkey(["backspace", "delete"], event)) {
        // Backspace key pressed
        // set_active_field_value(value, active_field);
        const solved_value = sudoku_store.solved[active_field.row][active_field.column];
        const active_value = sudoku_store.unsolved[active_field.row][active_field.column].value;
        if (solved_value === solved_value) return false;
        if (active_value) sudoku_store.unsolved[active_field.row][active_field.column].value = 0;
    } else if (isKeyHotkey(["1", "2", "3", "4", "5", "6", "7", "8", "9"], event)) {
        // Number key pressed
        const value = Number(event.key);
        const timer = timer_store;
        /** If timer stopped, then disable input */
        if (timer.paused) return false;
        /** Check if `value` is number */
        if (Number.isNaN(value)) return false;

        set_active_field_value(value, active_field);
    }
};
