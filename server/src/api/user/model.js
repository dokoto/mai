import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
import * as consts from '../../constants'

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
      trim: true
    },
    services: {
      facebook: String,
      github: String,
      google: String
    },
    role: {
      type: String,
      enum: consts.users.roles,
      default: 'user'
    },
    picture: {
      type: String,
      trim: true
    },
    funcRole: {
      type: String,
      default: 'patient',
      enum: consts.users.funcRoles
    },
    address: {
      type: String,
      maxlength: 200
    },
    phone: {
      type: Number,
      maxlength: 20
    },
    treatments: {
      type: [String]
    },
    lastLogin: {
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
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt
    .hash(this.password, rounds)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(next)
})

userSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'role', 'funcRole', 'address', 'phone', 'treatments', 'createdAt', 'lastLogin']
    }

    fields.forEach(field => {
      view[field] = this[field]
    })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then(valid => (valid ? this : false))
  }
}

userSchema.statics = {
  roles: consts.users.roles,

  createFromService ({
    service, id, email, name, picture, funcRole, address, phone, treatments
  }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then(user => {
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
        picture,
        funcRole,
        address,
        phone,
        treatments
      })
    })
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['funcRole'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
