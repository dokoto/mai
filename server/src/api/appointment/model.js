import mongoose, { Schema } from 'mongoose'
import { arrayToObject } from '../../utils'
import * as consts from '../../constants'

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    patientId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    treatmentKey: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: consts.RESERVED,
      enum: consts.appointment.status
    },
    allowReBooking: {
      type: Boolean,
      default: true
    },
    createddBy: {
      type: Schema.Types.ObjectId,
      required: true
    },
    cancelReason: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
)

appointmentSchema.methods = {
  view (full) {
    let fields = [
      'id',
      'date',
      'time',
      'treatmentKey',
      'doctorId',
      'patientId',
      'address',
      'status'
    ]

    if (full) {
      fields = fields.concat(['createdAt', 'updatedAt'])
    }

    return fields.reduce(arrayToObject(this), {})
  }
}

appointmentSchema.statics.bulkInsert = function (models, fn) {
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

const model = mongoose.model('Appointment', appointmentSchema)

export const schema = model.schema
export default model
