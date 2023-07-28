import { writable } from "svelte/store";

export const timer_store = writable({
      count: 0,
      paused: false,
});

function number_to_time_string(value: number, break_condition?: boolean): string {
      if (break_condition) return '';
      else if (value > 9) return `${value}`;
      else return `0${value}`;
}
export function number_to_time(counter: number) {
      const time = Math.floor(counter / 10);
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time - hours * 3600) / 60);
      const seconds = time - hours * 3600 - minutes * 60;
      const h = number_to_time_string(hours, hours === 0);
      const m = number_to_time_string(minutes);
      const s = number_to_time_string(seconds);
      return (h.length > 0 ? `${h}:` : '') + `${m ?? '00'}:${s ?? '00'}`;
}