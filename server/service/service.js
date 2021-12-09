class Service {
    constructor() {

    }
    error(err) {
        console.log(err);
        return {
            success: false,
            err,
        };
    }

    success(result) {
        return {
            success: true,
            result,
        };
    }
}

module.exports = Service