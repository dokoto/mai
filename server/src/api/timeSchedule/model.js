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
        enum: consts.schedule.days // MON, TUS, WED, THU, SAT, SUN
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
    let fields = ['id', 'time']

    if (full) {
      fields = fields.concat(['createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

timeScheduleSchema.plugin(mongooseKeywords, { paths: ['time', 'doctorsId'] })
const model = mongoose.model('TimeSchedule', timeScheduleSchema)

export const schema = model.schema
export default model
