import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { arrayToObject } from '../../utils'

const literalSchema = new Schema(
  {
    lang: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    key: {
      type: String,
      required: true,
      index: true
    },
    text: String
  },
  {
    timestamps: true
  }
)

literalSchema.methods = {
  view (full) {
    let fields = ['id', 'lang', 'key', 'text']

    if (full) {
      fields = fields.concat(['createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

literalSchema.statics.bulkInsert = function (models, fn) {
  if (!models || !models.length) return fn(null)

  const bulk = this.collection.initializeOrderedBulkOp()
  if (!bulk) return fn('bulkInsertModels: MongoDb connection is not yet established')

  let model
  for (let i = 0; i < models.length; i++) {
    model = models[i]
    bulk.insert(model)
  }

  bulk.execute(fn)
}

literalSchema.plugin(mongooseKeywords, { paths: ['lang', 'key'] })
const model = mongoose.model('Literal', literalSchema)

export const { schema } = model
export default model
