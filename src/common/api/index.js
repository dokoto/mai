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

// OLD
export function getTherapies(therapyIds) {
  const queryParams = therapyIds
    ? therapyIds.reduce(
        (prev, curr, index) =>
          index === 0 ? prev + curr : `${prev}&id=${curr}`,
        '?id='
      )
    : null;
  return fetch(`${paths.therapies}${queryParams || ''}`).then(response =>
    response.json()
  );
}

export function getSession(sessionId) {
  return fetch(`${paths.sessions}/${sessionId}`).then(response =>
    response.json()
  );
}
export function getUser(type, id = '') {
  return fetch(`${paths.users}/${type}/${id}`).then(response =>
    response.json()
  );
}
export function getUsersByType(type) {
  return fetch(`${paths.users}/${type}`).then(response => response.json());
}
export function getToDaySessions(selectedDay) {
  return fetch(`${paths.sessionsBy}/${selectedDay}`).then(response =>
    response.json()
  );
}
export function getSessionTimeSchedule() {
  return fetch(`${paths.SessionTimeSchedule}`).then(response =>
    response.json()
  );
}
export function getBusyDays(userId, initDate, numOfMonths) {
  return fetch(`${paths.busyDays}/${userId}/${initDate}/${numOfMonths}`).then(
    response => response.json()
  );
}
export function getBusyTimes(userId, date) {
  return fetch(`${paths.busyTimes}/${userId}/${date}`).then(response =>
    response.json()
  );
}
export function getBusyTherapists() {
  return fetch(`${paths.busyTherapists}`).then(response => response.json());
}
