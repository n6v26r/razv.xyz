export function clickOutside(node, { callback, ignore = [] }) {
	function handleClick(event) {
		const isIgnored = ignore.some(el => el && el.contains(event.target));
		if (!node.contains(event.target) && !isIgnored) {
			callback();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
