import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Treatment, { schema } from './model'

const router = new Router()
const { nameTranslId, descriptionTranslId } = schema.tree

/**
 * @api {post} /treatments Create treatment
 * @apiName CreateTreatment
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
router.post('/',
  master(),
  body({ nameTranslId, descriptionTranslId }),
  create)

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
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /treatments/:id Retrieve treatment
 * @apiName RetrieveTreatment
 * @apiGroup Treatment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /treatments/:id Update treatment
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
router.put('/:id',
  master(),
  body({ nameTranslId, descriptionTranslId }),
  update)

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
router.delete('/:id',
  master(),
  destroy)

export default router
