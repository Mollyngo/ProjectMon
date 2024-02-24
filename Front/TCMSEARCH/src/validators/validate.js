const validate = schema => input => {
    const { error } = schema.validate(input, { abortEarly: false })

    if (error) {
        const result = error.details.reduce((acc, el) => {
            acc[el.path[0]] = el.message
            return acc
        }, {})
        console.log(result)
        return result
    }
}


export default validate