import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy, showNexts } from './controller'
import { schema } from './model'

export Appointment, { schema } from './model'

const router = new Router()

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
router.post('/', token({ required: true }), create)

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
router.get('/', token({ required: true, roles: ['admin'] }), query(), index)

/**
 * @api {get} /appointments/me/nexts Retrieve nests appointments
 * @apiName RetrieveAppointments
 * @apiGroup Appointment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {Numbre} [num] size of appointment to show
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Appointment not found.
 * @apiError 401 user access only.
 */
router.get('/me/nexts/:num?', token({ required: true }), showNexts)

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
router.get('/:id', token({ required: true, roles: ['admin'] }), show)

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
router.put('/:id', token({ required: true }), update)

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
