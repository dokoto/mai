import { Router } from 'express';
import { middleware as query } from 'querymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Treatment, { schema } from './model';

const router = new Router();
const { key } = schema.tree;

/**
 * @api {post} /treatments Create treatment
 * @apiName CreateTreatment
 * @apiGroup Treatment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam key Treatment's key.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 admin access only.
 */
router.post('/', token({ required: true, roles: ['admin'] }), create);

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
router.get('/', token({ required: true }), query(), index);

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
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /treatments/:id Update treatment
 * @apiName UpdateTreatment
 * @apiGroup Treatment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam key Treatment's key.
 * @apiSuccess {Object} treatment Treatment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Treatment not found.
 * @apiError 401 admin access only.
 */
router.put('/:id', token({ required: true, roles: ['admin'] }), update);

/**
 * @api {delete} /treatments/:id Delete treatment
 * @apiName DeleteTreatment
 * @apiGroup Treatment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Treatment not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy);

export default router;
