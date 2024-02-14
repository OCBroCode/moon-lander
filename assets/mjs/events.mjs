export const dispatchEventWithDetails = (eventName, details) => {
	document.dispatchEvent(
		new CustomEvent(eventName, {
			detail: details
		})
	);
}