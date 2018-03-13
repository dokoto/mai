import mongoose, { Schema } from 'mongoose'
import { arrayToObject } from '../../utils'

const treatmentSchema = new Schema(
  {
    nameTranslId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    descriptionTranslId: Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
)

treatmentSchema.methods = {
  view (full) {
    let fields = ['id', 'nameTranslId']

    if (full) {
      fields = fields.concat(['descriptionTranslId', 'createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

const model = mongoose.model('Treatment', treatmentSchema)

export const { schema } = model
export default model
