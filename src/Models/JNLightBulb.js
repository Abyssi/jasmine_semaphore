const JsonSerializable = require('../Utils/JsonSerializable.js');

class JNLightBulb extends JsonSerializable {
    constructor(color, status) {
        super();

        this.color = color;
        this.status = status;
    }
}

module.exports = JNLightBulb;