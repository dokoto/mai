import { success, notFound } from '../../services/response/'
import { Literal } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Literal.create(body)
    .then(literal => literal.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Literal.find(query, select, cursor)
    .then(literals => literals.map(literal => literal.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Literal.findById(params.id)
    .then(notFound(res))
    .then(literal => (literal ? literal.view() : null))
    .then(success(res))
    .catch(next)

export const showByLangKey = ({ params }, res, next) =>
  Literal.findOne(params)
    .then(notFound(res))
    .then(literal => (literal ? literal.view() : null))
    .then(success(res))
    .catch(next)

export const showByLang = ({ params }, res, next) => {
  console.log('>>>>>>>>>>', params)
  Literal.find(params)
    .then(notFound(res))
    .then(literals => literals.map(literal => literal.view()))
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Literal.findById(params.id)
    .then(notFound(res))
    .then(literal => (literal ? Object.assign(literal, body).save() : null))
    .then(literal => (literal ? literal.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Literal.findById(params.id)
    .then(notFound(res))
    .then(literal => (literal ? literal.remove() : null))
    .then(success(res, 204))
    .catch(next)
