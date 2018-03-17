import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'

export Treatment, { schema } from './model'

const router = new Router()
const { key, nameLiteralKey, descriptionLiteralKey } = schema.tree

/**
 * @api {post} /treatments Create treatment
 * @apiName CreateTreatment
 * @apiGroup Treatment
 * @apiPermission admin
 * @apiParam {String} access_token master access token.
 * @apiParam key Treatment's key identifier.
 * @apiParam nameLiteralKey literal collection id for treatment name.
 * @apiParam descriptionLiteralKey literal collection id for treatment description.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 master access only.
 */
router.post('/', token({ required: true, roles: ['admin'] }), body({ key, nameLiteralKey, descriptionLiteralKey }), create)

/**
 * @api {get} /treatments Retrieve treatments
 * @apiName RetrieveTreatments
 * @apiGroup Treatment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} treatments List of treatments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /treatments/:lang/:key Retrieve treatment
 * @apiName RetrieveTreatment
 * @apiGroup Treatment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} lang texts languaje.
 * @apiParam {String} key tratment key.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 user access only.
 */
router.get('/:lang/:key', token({ required: true }), show)

/**
 * @api {put} /treatments/:key Update treatment
 * @apiName UpdateTreatment
 * @apiGroup Treatment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Treatment's name.
 * @apiParam text Treatment's text.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 master access only.
 */
router.put('/:key', token({ required: true, roles: ['admin'] }), body({ nameLiteralKey, descriptionLiteralKey }), update)

/**
 * @api {delete} /treatments/:id Delete treatment
 * @apiName DeleteTreatment
 * @apiGroup Treatment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Treatment not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)

export default router
