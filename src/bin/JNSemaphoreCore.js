const JNSemaphore = require('../Models/JNSemaphore.js');
const JNLightBulbStatus = require('../Models/JNLightBulbStatus.js');

const JNSemaphoreMessage = require('../Connectors/Messages/JNSemaphoreMessage.js');
const JNSemaphoreSensorListener = require('../Connectors/JNSemaphoreSensorListener.js');
const JNKafkaProducer = require('../Connectors/JNKafkaProducer.js');

const Timer = require('../Utils/Timer.js');
const MethodBinder = require('../Utils/MethodBinder.js');
const RandomUtils = require('../Utils/RandomUtils.js');

class JNSemaphoreCore {
    constructor(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, listener, producer) {
        MethodBinder.bindMethods(this, ['onSensorMessage', 'producerTick']);

        this.semaphore = new JNSemaphore(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, 0, 0);
        this.listener = listener;
        this.producer = producer;

        this.listener.listener = this.onSensorMessage;
        this.listener.start();

        this.timer = new Timer(this.producerTick);
        this.timer.start(time);
    }

    onSensorMessage(message) {
        this.semaphore.averageSpeed += parseFloat(message.speed);
        this.semaphore.vehiclesCount++;
    }

    producerTick(timestamp) {
        this.semaphore.averageSpeed /= (this.semaphore.averageSpeed > 0 && this.semaphore.vehiclesCount > 0) ? this.semaphore.vehiclesCount : 0;
        this.producer.send(new JNSemaphoreMessage(this.semaphore.crossroadsId, this.semaphore.semaphoreId, timestamp, this.semaphore.position, this.semaphore.greenDuration, this.semaphore.lightBulbs, this.semaphore.vehiclesCount, this.semaphore.averageSpeed).toJSONString);
        this.semaphore.averageSpeed = 0;
        this.semaphore.vehiclesCount = 0;
        if (RandomUtils.exponentialRandomNumber(9) > 1)
            this.semaphore.lightBulbs[RandomUtils.randomInteger(0, this.semaphore.lightBulbs.length - 1)].status = JNLightBulbStatus.DAMAGED;
    }
}

class JNSemaphoreVirtualCore extends JNSemaphoreCore {
    constructor(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, host, topic) {
        super(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, new JNSemaphoreSensorListener.JNSemaphoreSensorListener(), new JNKafkaProducer(host, topic));
    }
}

class JNSemaphoreProcessCore extends JNSemaphoreCore {
    constructor(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, host, topic) {
        super(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, new JNSemaphoreSensorListener.JNSemaphoreSensorIPCListener(), new JNKafkaProducer(host, topic));
    }
}

class JNSemaphoreRealCore extends JNSemaphoreCore {
    constructor(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, host, topic) {
        super(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, time, new JNSemaphoreSensorListener.JNSemaphoreSensorSerialListener('/dev/tty-usbserial1', 9600), new JNKafkaProducer(host, topic));
    }
}

module.exports = {JNSemaphoreCore, JNSemaphoreVirtualCore, JNSemaphoreProcessCore, JNSemaphoreRealCore};