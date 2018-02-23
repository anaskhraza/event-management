module.exports = (function () {
    process.env.PORT = 3000;
    return {
        generalConfig: {
            port: process.env.PORT

        }
    }
}())