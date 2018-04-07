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
      required: true,
      maxlength: 5
    },
    patient: {
      id: {
        type: Schema.Types.ObjectId,
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
    doctor: {
      id: {
        type: Schema.Types.ObjectId,
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
    treatment: [
      {
        key: {
          type: String,
          maxlength: 40
        },
        lang: {
          type: String,
          maxlength: 2,
          enum: consts.users.languages
        },
        name: {
          type: String,
          maxlength: 300
        },
        description: {
          type: String,
          maxlength: 1000
        }
      }
    ],
    address: {
      street: {
        type: String,
        maxlength: 200,
        required: true
      },
      floor: {
        type: String,
        maxlength: 100,
        required: true
      },
      postCode: {
        type: Number,
        maxlength: 20
      },
      city: {
        type: String,
        maxlength: 100,
        required: true
      },
      country: {
        type: String,
        maxlength: 100,
        required: true
      }
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
      maxlength: 2000
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
