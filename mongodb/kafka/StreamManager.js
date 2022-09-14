const events = Object.freeze({
	DEMO_MESSAGE: 'demo-message',
});
const event_functions = Object.freeze({
	[events.DEMO_MESSAGE]: async (data) => {
		console.log('tenant created in mogno', data);
	},
});

exports.streamProcessor = async ({ data }) => {
	if (event_functions[data.event]) {
		await event_functions[data.event](data);
	}
};
