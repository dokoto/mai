import { success, notFound } from '../../services/response/'
import { Treatment } from '.'
import * as utils from '../../utils'
import { Literal } from '../literal'

export const create = ({ bodymen: { body } }, res, next) =>
  Treatment.create(body)
    .then(treatment => treatment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Treatment.find(query, select, cursor)
    .then(treatments => treatments.map(treatment => treatment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) => {
  Treatment.findOne({ key: params.key })
    .then(notFound(res))
    .then(treatment => (treatment ? treatment.view(true) : null))
    .then(async treatment => {
      console.log('>>>>>>>>', treatment)
      const query = [treatment.nameLiteralKey, treatment.descriptionLiteralKey].reduce(
        utils.genOrQuery('key'),
        {
          $or: [],
          lang: params.lang
        }
      )
      console.log('>>>>>>>>', query)
      const literal = await Literal.find(query)
      // hay que mapear el resultado literal que es un array a la salida del tratamiento
      treatment.nameLiteralKey = literal.nameLiteralKey
      treatment.descriptionLiteralKey = literal.descriptionLiteralKey
      console.log('>>>>>>>>', literal)
      return treatment
    })
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Treatment.findOne(params)
    .then(notFound(res))
    .then(treatment => (treatment ? Object.assign(treatment, body).save() : null))
    .then(treatment => (treatment ? treatment.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Treatment.findById(params.id)
    .then(notFound(res))
    .then(treatment => (treatment ? treatment.remove() : null))
    .then(success(res, 204))
    .catch(next)
