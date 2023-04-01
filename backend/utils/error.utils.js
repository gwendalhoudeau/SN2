module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email:'', password: ''}

    if (err.message.includes('pseudo'))
        errors.pseudo = "pseudo incorrect ou déjà pris"

    if (err.message.includes('email'))
        errors.email = "email incorrect ou déjà pris"

    if (err.message.includes('password'))
        errors.password = "le mot de passe doit faire au moins 6 caractères"

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.email = 'ce pseudo est deja enregistré'

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = 'cet email est deja enregistré'
    return errors
}

module.exports.signInErrors = (err) =>{
    let error = {email:'',password:''}

    if(err.message.includes('email')) error.email = "email inconnu"
    if(err.message.includes('password')) error.password = "mot de passe incorrect"

    return error
}

module.exports.uploadErrors = (err) => {
    let error = {format: '', maxSize:''}

    if(err.message.includes('invalid file'))
        error.format = 'format incompatible'

    if(err.message.includes('max size'))
        error.format = 'fichier dépasse 500ko'
}