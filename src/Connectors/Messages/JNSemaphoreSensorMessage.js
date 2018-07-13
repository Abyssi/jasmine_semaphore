const JsonSerializable = require('../../Utils/JsonSerializable.js');

class JNSemaphoreSensorMessage extends JsonSerializable {
    constructor(speed) {
        super();

        this.speed = speed;
    }
}

module.exports = JNSemaphoreSensorMessage;