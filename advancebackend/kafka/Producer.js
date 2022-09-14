var Kafka = require('node-rdkafka');

class ProducerClass {
	constructor() {
		try {
			this.producer = new Kafka.Producer({
				'metadata.broker.list': 'localhost:9092',
				dr_cb: true,
			});

			this.initProducer().then(
				(message) => {
					console.log(message);
				},
				(error) => {
					console.log('Error on Producer Initialize-1 :', error);
				},
			);
		} catch (error) {
			console.log('Error on Producer Initialize-2 :', error);
		}
	}

	initProducer() {
		return new Promise((resolve, reject) => {
			this.producer
				.on('ready', () => {
					console.log('Producer Connected....');
					resolve('Producer Object Created.... ');
				})
				.on('delivery-report', (err, report) => {
					if (err) console.log('Delevery Report :', err);
					else console.log('Delevery Report :', report);
				})
				.on('event.error', (err) => {
					reject(err);
				})
				.on('disconnected', () => {
					console.log('Producer Disconnected....');
				});
			this.connect();
		});
	}

	connect() {
		try {
			this.producer.connect((error) => {
				console.log('Producer Connection Error :', error);
			});
		} catch (error) {
			console.log('Producer Connection Error :', error);
		}
	}

	disconnect() {
		try {
			this.producer.disconnect((error) => {
				console.log('Producer Disconnected Error :', error);
			});
		} catch (error) {
			console.log('Producer Disconnected Error :', error);
		}
	}

	async sendPayload(message, topic) {
		try {
			let key = 'Key';
			let value = Buffer.from(JSON.stringify(message));
			return await this.producer.produce(topic, null, value, key);
		} catch (e) {
			return e;
		}
	}
}
module.exports = new ProducerClass();
