const jwt = require('jsonwebtoken')
const queries = require('../Queries/UserQueries')
const config = require('../../config')
const UserApi = {};

UserApi.SetJWT = (auth) => {
  console.log('auth', auth)
  const result = { userId: auth.Login, isSuccess: false, tocken: { }, expire: config.JWT.expire }
  //console.log(result)
  return queries.GetUserByLogin(auth.Login).then(user => {
    console.log(user.Role)
    const Role = user.Role
    const pwdBDD = isNullOrWhiteSpace(user.Password) ? user.Password : ''
    const pwdFRT = isNullOrWhiteSpace(auth.Password) ? auth.Password : ''
    //console.log(pwdBDD, pwdFRT)

    if (pwdBDD == pwdFRT) {
      result.isSuccess = true
      result.tocken = jwt.sign( { user_id: user.Id }, config.JWT.secret,{ expiresIn: result.expire })
    }
    console.log(result)
    return result
  })
}

isNullOrWhiteSpace = (str) => {
  return str === undefined || str === null
    || typeof str !== 'string'
    || str.match(/^ *$/) !== null
}

module.exports = UserApi