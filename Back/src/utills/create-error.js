

const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
    console.log(error)
}

module.exports = createError