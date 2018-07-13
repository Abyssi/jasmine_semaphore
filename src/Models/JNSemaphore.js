const JsonSerializable = require('../Utils/JsonSerializable.js');

class JNSemaphore extends JsonSerializable {
    constructor(crossroadsId, semaphoreId, position, greenDuration, lightBulbs, vehiclesCount, averageSpeed) {
        super();

        this.crossroadsId = crossroadsId;
        this.semaphoreId = semaphoreId;
        this.position = position;
        this.greenDuration = greenDuration;
        this.lightBulbs = lightBulbs;
        this.vehiclesCount = vehiclesCount;
        this.averageSpeed = averageSpeed;
    }
}

module.exports = JNSemaphore;