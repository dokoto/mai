import { success, notFound } from '../../services/response/'
import { TimeSchedule } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  TimeSchedule.create(body)
    .then((timeSchedule) => timeSchedule.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  TimeSchedule.find(query, select, cursor)
    .then((timeSchedules) => timeSchedules.map((timeSchedule) => timeSchedule.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  TimeSchedule.findById(params.id)
    .then(notFound(res))
    .then((timeSchedule) => timeSchedule ? timeSchedule.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  TimeSchedule.findById(params.id)
    .then(notFound(res))
    .then((timeSchedule) => timeSchedule ? Object.assign(timeSchedule, body).save() : null)
    .then((timeSchedule) => timeSchedule ? timeSchedule.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TimeSchedule.findById(params.id)
    .then(notFound(res))
    .then((timeSchedule) => timeSchedule ? timeSchedule.remove() : null)
    .then(success(res, 204))
    .catch(next)
