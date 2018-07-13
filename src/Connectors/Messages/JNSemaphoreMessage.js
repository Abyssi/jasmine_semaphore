const JsonSerializable = require('../../Utils/JsonSerializable.js');

class JNSemaphoreMessage extends JsonSerializable {
    constructor(crossroadsId, semaphoreId, timestamp, position, greenDuration, lightBulbs, vehiclesCount, averageSpeed) {
        super();
        this.crossroadsId = crossroadsId;
        this.semaphoreId = semaphoreId;
        this.timestamp = timestamp;
        this.position = position;
        this.greenDuration = greenDuration;
        this.lightBulbs = lightBulbs;
        this.vehiclesCount = vehiclesCount;
        this.averageSpeed = averageSpeed;
    }
}

module.exports = JNSemaphoreMessage;