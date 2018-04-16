import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { arrayToObject } from '../../utils'
import * as consts from '../../constants'

const timeScheduleSchema = new Schema(
  {
    doctor: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      name: {
        type: String,
        maxlength: 100
      },
      surname: {
        type: String,
        maxlength: 200
      },
      email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        trim: true,
        lowercase: true
      }
    },
    daily: [
      {
        day: {
          type: Number,
          min: 0,
          max: 6 // MON:1, TUS:2, WED:3, THU:4, FRI:5, SAT:6, SUN:0
        },
        time: [
          {
            type: String,
            maxlength: 5
          }
        ]
      }
    ],
    exception: [
      {
        day: {
          type: Number,
          min: 0,
          max: 6 // MON:1, TUS:2, WED:3, THU:4, FRI:5, SAT:6, SUN:0
        },
        // Si no hay horas ese dia esta desabilitado por completo
        time: [
          {
            type: String,
            maxlength: 5
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

timeScheduleSchema.methods = {
  view (full) {
    let fields = ['id', 'doctor', 'daily', 'exception']

    if (full) {
      fields = fields.concat(['createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

timeScheduleSchema.statics.bulkInsert = function (models, fn) {
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

timeScheduleSchema.plugin(mongooseKeywords, { paths: ['doctor.email'] })
const model = mongoose.model('TimeSchedule', timeScheduleSchema)

export const schema = model.schema
export default model
