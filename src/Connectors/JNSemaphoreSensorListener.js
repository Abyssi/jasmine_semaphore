const SerialPort = require('serialport');
const JNSemaphoreSensorMessage = require('./Messages/JNSemaphoreSensorMessage');

class JNSemaphoreSensorListener {
    constructor(listener) {
        this.listener = listener;
        this.state = "STOPPED";
    }

    send(message) {
        if (this.state === "RUNNING")
            this.listener(message);
    }

    start() {
        this.state = "RUNNING";
    }

    stop() {
        this.state = "STOPPED";
    }
}

class JNSemaphoreSensorIPCListener extends JNSemaphoreSensorListener {
    constructor(listener) {
        super(listener);

        this.setup();
    }

    setup() {
        const self = this;
        process.on("message", message => {
            self.send(message);
        });
    }
}

class JNSemaphoreSensorSerialListener extends JNSemaphoreSensorListener {
    constructor(port, rate, listener) {
        super(listener);

        this.setup(port, rate);
    }

    setup(port, rate) {
        const serialPort = new SerialPort(port, {
            baudRate: rate,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            flowControl: false
        });

        serialPort.on("open", function () {
            let receivedData = "";
            serialPort.on('data', function (data) {
                receivedData += data.toString();
                if (receivedData.indexOf('\n') >= 0) {
                    const message = receivedData.substring(0, receivedData.indexOf('\n') + 1);
                    receivedData = receivedData.substring(receivedData.indexOf('\n') + 1, receivedData.length);

                    self.send(message);
                }
            });
        });
    }
}

module.exports = {JNSemaphoreSensorListener, JNSemaphoreSensorIPCListener, JNSemaphoreSensorSerialListener};