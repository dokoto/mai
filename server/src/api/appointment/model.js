import mongoose, { Schema } from 'mongoose'

const appointmentSchema = new Schema({
  email: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  treatment: {
    type: String
  },
  doc: {
    type: String
  },
  address: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

appointmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      date: this.date,
      time: this.time,
      treatment: this.treatment,
      doc: this.doc,
      address: this.address,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Appointment', appointmentSchema)

export const schema = model.schema
export default model
