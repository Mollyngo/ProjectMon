const validate = (schema, input) => {
    const { error } = schema.validate(input, { abortEarly: false })
    console.dir(error)
    if (error) {
        return error
    }
}


export default validate