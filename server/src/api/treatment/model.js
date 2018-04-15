import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords';
import { arrayToObject } from '../../utils';
import * as consts from '../../constants'

const treatmentSchema = new Schema({
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
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

treatmentSchema.methods = {
  view(full) {
    let fields = [
      'id',
      'key',
      'lang',
      'name',
      'description'
    ];

    if (full) {
      fields = fields.concat(['createdAt', 'updatedAt']);
    }

    return fields.reduce(arrayToObject(this), {});
  }
}

treatmentSchema.plugin(mongooseKeywords, { paths: ['key', 'lang'] });
const model = mongoose.model('Treatment', treatmentSchema)

export const schema = model.schema
export default model
