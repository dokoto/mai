import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { arrayToObject } from '../../utils'
import * as consts from '../../constants'

const timeScheduleSchema = new Schema(
  {
    doctorsId: {
      type: [Schema.Types.ObjectId]
    },
    kind: {
      type: String,
      enum: consts.schedule.types // daily, exception
    },
    daily: {
      day: {
        type: String,
        enum: consts.schedule.days // MON, TUS, WED, THU, FRI, SAT, SUN
      },
      time: {
        type: String
      }
    },
    exception: {
      date: {
        type: Date
      },
      time: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
)

timeScheduleSchema.methods = {
  view (full) {
    let fields = ['id', 'daily']

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

timeScheduleSchema.plugin(mongooseKeywords, { paths: ['doctorsId'] })
const model = mongoose.model('TimeSchedule', timeScheduleSchema)

export const schema = model.schema
export default model
