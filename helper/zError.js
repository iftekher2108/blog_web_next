const errorOrganize = (errors) => {
    if (errors) {
        const formattedErrors = {};
        errors.forEach(err => {
            const field = err.path[0]; // 'email' or 'password'
            formattedErrors[field] = err.message;
        });
        return formattedErrors; // Zod returns an array of issues
    }
    return;
}

export default errorOrganize;