import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import { tokenExpiration } from '../../config'
import { saveLogin } from '../user/controller'

export const login = ({ user }, res, next) => sign(user.id, { expiresIn: tokenExpiration }) // 24h
  .then(token => ({ token, user: user.view(true) }))
  .then(saveLogin(user.id))
  .then(success(res, 201))
  .catch(next)
