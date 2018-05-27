/**
 * @module Common/Utils/api/sevices
 */

import _ from 'lodash/object';
import store from '../../modules/app/logic/store';
import { EMPTY_STRING } from '../constants';
import * as paths from './paths';
import { Post, Get } from './req';

export const bearerAuth = token => ({ Authorization: `Bearer ${token}` });
export const basicAuth = (username, password) => ({
  Authorization: `Basic ${btoa(`${username}:${password}`)}`
});

export function nextsAppointments(num = 3) {
  return Get.fetch(`${paths.appointment}/me/nexts/${num}`, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function login(username, password) {
  return Post.fetch(paths.login, {
    headers: basicAuth(username, password),
    body: { access_token: process.env.MASTER_API_KEY }
  });
}

export function getAppointment(id) {
  return Get.fetch(`${paths.appointment}/me/${id}`, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function getTreatments() {
  return Get.fetch(paths.treatments, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function getDoctors() {
  return Get.fetch(`${paths.users}/doctors`, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function getDoctorsSchedules() {
  return Get.fetch(paths.timeSchedules, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function getDoctorNextAppointments(email) {
  return Get.fetch(`${paths.appointment}/doctor/${email}/nexts`, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING))
  });
}

export function createAppointment(appointment) {
  return Post.fetch(paths.appointment, {
    headers: bearerAuth(_.get(store, 'state.app.session.token', EMPTY_STRING)),
    body: { ...appointment }
  });
}
