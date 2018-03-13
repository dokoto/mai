import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, showByLangKey, showByLang } from './controller'
import { schema } from './model'

export Literal, { schema } from './model'

const router = new Router()
const { lang, key, text } = schema.tree

/**
 * @api {post} /literals Create literal
 * @apiName CreateLiteral
 * @apiGroup Literal
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam lang Literal's lang.
 * @apiSuccess {Object} literal Literal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Literal not found.
 * @apiError 401 admin access only.
 */
router.post('/', token({ required: true, roles: ['admin'] }), body({ lang, key, text }), create)

/**
 * @api {get} /literals Retrieve literals
 * @apiName RetrieveLiterals
 * @apiGroup Literal
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} literals List of literals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /literals/:id Retrieve literal
 * @apiName RetrieveLiteral
 * @apiGroup Literal
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} literal Literal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Literal not found.
 * @apiError 401 user access only.
 */
// router.get('/:id', token({ required: true }), show)

/**
 * @api {get} /literals/:lang/:key Retrieve literal
 * @apiName RetrieveLiteral
 * @apiGroup Literal
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} lang literal languaje [es,en].
 * @apiParam {String} key literal text key.
 * @apiSuccess {Object} literal Literal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Literal not found.
 * @apiError 401 user access only.
 */
router.get('/:lang/:key', token({ required: true }), showByLangKey)

/**
 * @api {get} /literals/:lang Retrieve literal
 * @apiName RetrieveLiteral
 * @apiGroup Literal
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} lang literal languaje [es,en].
 * @apiSuccess {Object} literal Literal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Literal not found.
 * @apiError 401 user access only.
 */
router.get('/:lang', token({ required: true }), showByLang)

/**
 * @api {put} /literals/:id Update literal
 * @apiName UpdateLiteral
 * @apiGroup Literal
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam lang Literal's lang.
 * @apiSuccess {Object} literal Literal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Literal not found.
 * @apiError 401 admin access only.
 */
router.put('/:id', token({ required: true, roles: ['admin'] }), body({ lang, key, text }), update)

/**
 * @api {delete} /literals/:id Delete literal
 * @apiName DeleteLiteral
 * @apiGroup Literal
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Literal not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)

export default router
