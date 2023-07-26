import { writable } from 'svelte/store';
export enum DIALOG_STORE {
	'NONE' = 'NONE',
	'YOU_WIN' = 'YOU_WIN',
	'YOU_LOSE' = 'YOU_LOSE'
}
const dialog_store = writable<DIALOG_STORE>(DIALOG_STORE.NONE);

export default dialog_store;
