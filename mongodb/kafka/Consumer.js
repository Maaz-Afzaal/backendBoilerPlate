const Kafka = require('node-rdkafka');

const StreamConsumer = {
	/**@type {import ('node-rdkafka').KafkaConsumer} */
	instance: null,
};

function createConsumer(onData, group, client) {
	const consumer = new Kafka.KafkaConsumer(
		{
			'group.id': group,
			'client.id': client,
			'metadata.broker.list': 'localhost:9092',
		},
		{
			'auto.offset.reset': 'earliest',
		},
	);

	return new Promise((resolve, reject) => {
		consumer
			.on('ready', () => {
				console.log('Kafka consumer started');
				resolve(consumer);
			})
			.on('data', (message) => {
				const { timestamp, key, value, partition, offset, size } = message;
				console.log('message', JSON.parse(value.toString()));
				const data = {
					timestamp: timestamp,
					key: key?.toString(),
					data: JSON.parse(value.toString()),
					partition: partition,
					offset: offset,
					size: size,
				};

				onData(data);
			})
			.on('event.error', (error) => {
				reject(error);
			});

		consumer.connect();
	});
}

async function startConsumer(onData, { topic, group, client }) {
	const consumer = await createConsumer(onData, group, client);
	consumer.subscribe([topic]);
	consumer.consume();
	process.on('SIGINT', () => {
		console.log('\nDisconnecting consumer ...');
		consumer.disconnect();
	});

	StreamConsumer.instance = consumer;
}

module.exports = { startConsumer, StreamConsumer };
