import _ from 'lodash/array'
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

function genLiteralQueryByKeys (keys, lang) {
  return keys.reduce(utils.genOrQuery('key'), {
    $or: [],
    lang
  })
}

function mergeLiterals (acc, curr) {
  if (curr.key === acc.nameLiteralKey || curr.key === acc.descriptionLiteralKey) {
    acc[curr.key] = curr.text
  } else {
    delete acc[acc.nameLiteralKey]
    delete acc[acc.descriptionLiteralKey]
  }
  return acc
}

export const showByLang = ({ params }, res, next) => {
  Treatment.find()
    .then(notFound(res))
    .then(treatments => treatments.map(treatment => treatment.view(true)))
    .then(async (treatments) => {
      const literalKeys = _.flatten(
        treatments.map(item => [item.nameLiteralKey, item.descriptionLiteralKey])
      )
      const query = genLiteralQueryByKeys(literalKeys, params.lang)
      const literals = await Literal.find(query)
      return treatments.map(treatment => literals.reduce(mergeLiterals, treatment))
    })
    .then(success(res))
    .catch(next)
}

export const showByLangKey = ({ params }, res, next) => {
  Treatment.findOne({ key: params.key })
    .then(notFound(res))
    .then(treatment => (treatment ? treatment.view(true) : null))
    .then(async (treatment) => {
      const literalKeys = [treatment.nameLiteralKey, treatment.descriptionLiteralKey]
      const query = genLiteralQueryByKeys(literalKeys, params.lang)
      const literals = await Literal.find(query)
      return literals.reduce(mergeLiterals, treatment)
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
