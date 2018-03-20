import mongoose, { Schema } from 'mongoose'
import { arrayToObject } from '../../utils'

const treatmentSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    nameLiteralKey: {
      type: String,
      required: true,
      index: true
    },
    descriptionLiteralKey: String
  },
  {
    timestamps: true
  }
)

treatmentSchema.methods = {
  view (full) {
    let fields = ['id', 'nameLiteralKey']

    if (full) {
      fields = fields.concat(['descriptionLiteralKey', 'createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

treatmentSchema.statics.bulkInsert = function (models, fn) {
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

const model = mongoose.model('Treatment', treatmentSchema)

export const { schema } = model
export default model
