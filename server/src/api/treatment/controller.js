import { success, notFound } from '../../services/response/';
import { Treatment } from '.';

export const create = ({ body }, res, next) =>
  Treatment.create(body)
    .then(treatment => treatment.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Treatment.find(query, select, cursor)
    .then(treatments => treatments.map(treatment => treatment.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Treatment.findById(params.id)
    .then(notFound(res))
    .then(treatment => (treatment ? treatment.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ body, params }, res, next) =>
  Treatment.findById(params.id)
    .then(notFound(res))
    .then(
      treatment => (treatment ? Object.assign(treatment, body).save() : null)
    )
    .then(treatment => (treatment ? treatment.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Treatment.findById(params.id)
    .then(notFound(res))
    .then(treatment => (treatment ? treatment.remove() : null))
    .then(success(res, 204))
    .catch(next);
