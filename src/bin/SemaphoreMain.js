const JNSemaphoreCore = require('./JNSemaphoreCore.js');

class SemaphoreMain {
    constructor(argv) {
        const config = require(argv.hasOwnProperty("config_path") ? argv["config_path"] : './config.json');
        const type = argv.hasOwnProperty("type") ? argv["type"] : 'real';
        const time = argv.hasOwnProperty("time") ? argv["time"] : 1000;
        const kafkaBroker = argv.hasOwnProperty("kafka_broker") ? argv["kafka_broker"] : 'localhost:9092';
        const kafkaTopic = argv.hasOwnProperty("kafka_topic") ? argv["kafka_topic"] : 'semaphore-topic';

        const types = {
            'virtual': JNSemaphoreCore.JNSemaphoreVirtualCore,
            'process': JNSemaphoreCore.JNSemaphoreProcessCore,
            'real': JNSemaphoreCore.JNSemaphoreRealCore
        };

        this.core = new types[type](config.crossroadsId, config.semaphoreId, config.position, config.greenDuration, config.lightBulbs, time, kafkaBroker, kafkaTopic);
    }
}

module.exports = SemaphoreMain;