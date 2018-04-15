import { mongo } from '../../src/config'
import mongoose from '../../src/services/mongoose'

import user from '../../src/api/user/model'
import timeSchedule from '../../src/api/timeSchedule/model'
import appointment from '../../src/api/appointment/model'
import treatment from '../../src/api/treatment/model'

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.connection.on('open', (errConn, conn) => {
  if (!errConn) {
    user.collection.drop().catch(err => console.log(err))
    timeSchedule.collection.drop().catch(err => console.log(err))
    appointment.collection.drop().catch(err => console.log(err))
    treatment.collection.drop().catch(err => console.log(err))
  } else {
    console.error(errConn)
  }
})
