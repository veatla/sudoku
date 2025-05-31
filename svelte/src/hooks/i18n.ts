import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';

export const locale = writable('en');
export const locales = writable({} as Record<string, string>);
async function fetch_locale() {
	if (!browser) return false;
	
	return fetch(`${location.origin}/locales/${'en'}.json`)
		.then((data) => data.json())
		.catch(() => (false));
}

export async function init_locales() {
	const promise = await fetch_locale();
	locales.set(promise);
}
//  _?: Record<string, string | number>
export function translate(locales: Record<string, string>, key: string) {
	if (!locales) return key;
	const translated = locales[key];

	if (!translated) return key;
	else return translated;
}

export const t = derived(locales, ($locales) => (key: string) => translate($locales, key));
