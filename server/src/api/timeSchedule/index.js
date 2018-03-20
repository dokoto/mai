import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TimeSchedule, { schema } from './model'

const router = new Router()
const { time } = schema.tree

/**
 * @api {post} /timeSchedules Create time schedule
 * @apiName CreateTimeSchedule
 * @apiGroup TimeSchedule
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam times Time schedule's times.
 * @apiSuccess {Object} timeSchedule Time schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Time schedule not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ time }),
  create)

/**
 * @api {get} /timeSchedules Retrieve time schedules
 * @apiName RetrieveTimeSchedules
 * @apiGroup TimeSchedule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} timeSchedules List of time schedules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /timeSchedules/:id Retrieve time schedule
 * @apiName RetrieveTimeSchedule
 * @apiGroup TimeSchedule
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} timeSchedule Time schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Time schedule not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /timeSchedules/:id Update time schedule
 * @apiName UpdateTimeSchedule
 * @apiGroup TimeSchedule
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam times Time schedule's times.
 * @apiSuccess {Object} timeSchedule Time schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Time schedule not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ time }),
  update)

/**
 * @api {delete} /timeSchedules/:id Delete time schedule
 * @apiName DeleteTimeSchedule
 * @apiGroup TimeSchedule
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Time schedule not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
