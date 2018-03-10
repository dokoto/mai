import mongoose, { Schema } from 'mongoose'
import * as consts from '../../constants'

const treatmentSchema = new Schema(
  {
    treatment: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    text: [
      {
        language: {
          type: String,
          enum: consts.languages
        },
        name: {
          type: String,
          maxlength: 100
        },
        description: {
          type: String,
          maxlength: 1000
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

treatmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Treatment', treatmentSchema)

export const schema = model.schema
export default model
