import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'

export Appointment, { schema } from './model'

const router = new Router()
const {
  date,
  time,
  patientId,
  doctorId,
  treatmentKey,
  address,
  status,
  allowReBooking,
  createddBy,
  cancelReason
} = schema.tree

/**
 * @api {post} /appointments Create appointment
 * @apiName CreateAppointment
 * @apiGroup Appointment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {Date} date Appointment's date.
 * @apiParam {String} time Appointment's time.
 * @apiParam {ObjectId} patientId Appointment's patientId.
 * @apiParam {ObjectId} doctorId Appointment's doctorId.
 * @apiParam {String} treatmentKey Appointment's treatmentKey.
 * @apiParam {String} address Appointment's address.
 * @apiParam {String} status Appointment's status.
 * @apiParam {Boolean} allowReBooking Appointment's allowReBooking.
 * @apiParam {ObjectId} createddBy Appointment's createddBy.
 * @apiParam {String} cancelReason Appointment's cancelReason.
 * @apiSuccess {Object} appointment Appointment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointment not found.
 * @apiError 401 user access only.
 */
router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  body({
    date,
    time,
    patientId,
    doctorId,
    treatmentKey,
    address,
    status,
    allowReBooking,
    createddBy,
    cancelReason
  }),
  create
)

/**
 * @api {get} /appointments Retrieve appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} appointments List of appointments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /appointments/:id Retrieve appointment
 * @apiName RetrieveAppointment
 * @apiGroup Appointment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} appointment Appointment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointment not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} /appointments/:id Update appointment
 * @apiName UpdateAppointment
 * @apiGroup Appointment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam email Appointment's email.
 * @apiParam date Appointment's date.
 * @apiParam time Appointment's time.
 * @apiParam treatment Appointment's treatment.
 * @apiParam doc Appointment's doc.
 * @apiParam address Appointment's address.
 * @apiParam status Appointment's status.
 * @apiSuccess {Object} appointment Appointment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointment not found.
 * @apiError 401 user access only.
 */
router.put(
  '/:id',
  token({ required: true, roles: ['admin'] }),
  body({
    date,
    time,
    patientId,
    doctorId,
    treatmentKey,
    address,
    status,
    allowReBooking,
    createddBy,
    cancelReason
  }),
  update
)

/**
 * @api {delete} /appointments/:id Delete appointment
 * @apiName DeleteAppointment
 * @apiGroup Appointment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Appointment not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', master(), destroy)

export default router
