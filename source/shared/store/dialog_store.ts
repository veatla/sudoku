export enum DIALOG_STORE {
	'NONE' = 'NONE',
	'YOU_WIN' = 'YOU_WIN',
	'YOU_LOSE' = 'YOU_LOSE'
}
const dialog_store = reactive<{ type: DIALOG_STORE}>({ type: DIALOG_STORE.NONE });

export default dialog_store;
