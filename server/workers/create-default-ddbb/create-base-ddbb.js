import { mongo } from '../../src/config'
import mongoose from '../../src/services/mongoose'

import user from '../../src/api/user/model'
import treatment from '../../src/api/treatment/model'
// import timeSchedule from '../src/api/timeSchedule/model'
import literal from '../../src/api/literal/model'
// import appointment from '../src/api/appointment/model'

const literalData = require('./literals.json')
const treatmentData = require('./treatment.json')
const userData = require('./users.json')

const datas = [
  {
    data: literalData,
    schema: literal
  },
  {
    data: treatmentData,
    schema: treatment
  },
  {
    data: userData,
    schema: user
  }
]

function doBulk(model) {
  model.schema.collection.drop()
  model.schema.bulkInsert(model.data, (err, results) => {
    if (err) {
      console.log(err)
      process.exit(1)
    } else {
      console.log(results)
      process.exit(0)
    }
});
}

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.connection.on('open', (errConn, conn) => {
  if (!errConn) {
    datas.forEach(doBulk)
  } else {
    console.error(errConn)
  }
})
