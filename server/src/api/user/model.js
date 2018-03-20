import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
import * as consts from '../../constants'
import { arrayToObject } from '../../utils'

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    name: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    services: {
      facebook: String,
      github: String,
      google: String
    },
    role: {
      type: String,
      enum: consts.users.roles,
      default: consts.USER
    },
    picture: {
      type: String,
      trim: true
    },
    funcRole: {
      type: String,
      default: consts.PATIENT,
      enum: consts.users.funcRoles
    },
    address: {
      type: String,
      maxlength: 200,
      required: true
    },
    addressExtra: {
      type: String,
      maxlength: 100,
      required: true
    },
    phone: {
      type: Number,
      maxlength: 20,
      required: true
    },
    treatments: {
      type: [String]
    },
    loggedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto
      .createHash('md5')
      .update(email)
      .digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next()
  } else {
    /* istanbul ignore next */
    const rounds = env === 'test' ? 1 : 9

    bcrypt
      .hash(this.password, rounds)
      .then((hash) => {
        this.password = hash
        next()
      })
      .catch(next)
  }
})

userSchema.methods = {
  view (full) {
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = fields.concat([
        'lastName',
        'email',
        'role',
        'funcRole',
        'address',
        'addressExtra',
        'phone',
        'treatments',
        'createdAt',
        'loggedAt'
      ])
    }

    return fields.reduce(arrayToObject(this), {})
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then(valid => (valid ? this : false))
  }
}

userSchema.statics = {
  roles: consts.users.roles,

  createFromService ({ service, id, email, name, lastName, picture, funcRole, address, addressExtra, phone, treatments }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then((user) => {
      if (user) {
        user.services[service] = id
        user.name = name
        user.picture = picture
        return user.save()
      }
      const password = randtoken.generate(16)
      return this.create({
        services: { [service]: id },
        email,
        password,
        name,
        lastName,
        picture,
        funcRole,
        address,
        addressExtra,
        phone,
        treatments
      })
    })
  },

  bulkInsert (models, fn) {
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
}

userSchema.plugin(mongooseKeywords, { paths: ['funcRole', 'email'] })

const model = mongoose.model('User', userSchema)

export const { schema } = model
export default model
