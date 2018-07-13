module.exports = {
    randomInteger: function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomFloat: function randomFloat(min, max, decimals) {
        return (Math.random() * (max - min) + min).toFixed(decimals);
    },

    exponentialRandomNumber: function exponentialRandomNumber(mu) {
        var u = Math.random();
        return -Math.log(1.0 - u) / mu;
    },

    randomString: function randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
};