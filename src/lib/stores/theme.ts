import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type FlavorName } from "@catppuccin/palette"

export const systemThemePreference = writable("mocha");
export const theme = writable("mocha");

if (browser) {
	const html = document.documentElement;
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		systemThemePreference.set("mocha");
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		systemThemePreference.set(event.matches ? "mocha" : "latte");

		const attr = html.getAttribute('data-theme');
		if (attr === 'system') {
			theme.set(get(systemThemePreference));
		}
	});

	const currentTheme = html.getAttribute('data-theme');
	if (currentTheme === "system")
		theme.set(get(systemThemePreference))
	else
		theme.set(currentTheme);

	const observer = new MutationObserver(() => {
		const currentTheme = html.getAttribute('data-theme');
		if (currentTheme === "system")
			theme.set(get(systemThemePreference))
		else
			theme.set(currentTheme);
	});

	observer.observe(html, {
		attributes: true,
		attributeFilter: ['data-theme']
	});
}

