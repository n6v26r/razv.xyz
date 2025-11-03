import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { FlavorName } from "@catppuccin/palette";

export const systemThemePreference = writable<FlavorName>("mocha");
export const theme = writable<FlavorName>("mocha");

if (browser) {
	const html = document.documentElement;
	const mql = window.matchMedia('(prefers-color-scheme: dark)');

	// Set initial system preference
	systemThemePreference.set(mql.matches ? "mocha" : "latte");

	// Handle system theme changes
	const handler = (event: MediaQueryListEvent | MediaQueryList): void => {
		const isDark = event.matches;
		systemThemePreference.set(isDark ? "mocha" : "latte");

		const attr = html.getAttribute('data-theme');
		if (attr === 'system') {
			theme.set(get(systemThemePreference));
		}
	};

	// Add listener with fallback for Samsung Internet
	if (typeof mql.addEventListener === 'function') {
		mql.addEventListener('change', handler);
	} else if (typeof mql.addListener === 'function') {
		mql.addListener(handler);
	}

	// Set initial theme
	const currentTheme = html.getAttribute('data-theme');
	if (currentTheme === "system") {
		theme.set(get(systemThemePreference));
	} else if (currentTheme) {
		theme.set(currentTheme as FlavorName);
	}

	// Watch for changes to `data-theme`
	const observer = new MutationObserver(() => {
		const currentTheme = html.getAttribute('data-theme');
		if (currentTheme === "system") {
			theme.set(get(systemThemePreference));
		} else if (currentTheme) {
			theme.set(currentTheme as FlavorName);
		}
	});

	observer.observe(html, {
		attributes: true,
		attributeFilter: ['data-theme']
	});
}
