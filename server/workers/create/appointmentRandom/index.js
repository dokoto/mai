import request from 'request-promise';
import moment from 'moment';
import _ from 'lodash';

const appointmentFile = require('./appointmentBase.json');
const doctorsFile = require('./doctors.json');
const patientsFile = require('./patients.json');
const treatmentsFile = require('./treatments.json');

const TOKEN = {
  SUPER: 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8',
  MASTER: 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb',
  ADMIN: '',
  USER: ''
};

const paths = {
  auth: 'http://0.0.0.0:9000/api/v1/auth',
  users: 'http://0.0.0.0:9000/api/v1/users',
  treatments: 'http://0.0.0.0:9000/api/v1/treatments',
  timeSchedules: 'http://0.0.0.0:9000/api/v1/timeSchedules',
  appointments: 'http://0.0.0.0:9000/api/v1/appointments'
};

async function getAdminUser() {
  return request({
    method: 'POST',
    uri: paths.auth,
    body: {
      access_token: TOKEN.MASTER
    },
    auth: {
      user: 'dokoto.moloko@gmail.com',
      pass: '123456'
    },
    json: true
  });
}

async function getCommonUser() {
  return request({
    method: 'POST',
    uri: paths.auth,
    body: {
      access_token: TOKEN.MASTER
    },
    auth: {
      user: 'manuel@coolmail.com',
      pass: '123456'
    },
    json: true
  });
}

async function getUserByEmail(email) {
  return request({
    method: 'GET',
    uri: `${paths.users}?q=${email}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  });
}

async function getTreatmentByKey(key) {
  return request({
    method: 'GET',
    uri: `${paths.treatments}?q=${key}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  });
}

async function saveAppointment(url, accessToken, model) {
  return request({
    method: 'POST',
    uri: url,
    body: model,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }).catch(err => console.log(err.message.substr(0, 50)));
}

async function getDoctorSchedule(email) {
  const schedule = await request({
    method: 'GET',
    uri: `${paths.timeSchedules}?q=${email}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  });

  return _.get(schedule, '[0]', []);
}

function getDoctorFields(doctor) {
  return {
    name: doctor.name,
    surname: doctor.surname,
    email: doctor.email,
    picture: doctor.picture
  };
}

function getPatientFields(patient) {
  return {
    name: patient.name,
    surname: patient.surname,
    email: patient.email
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function fillDatas(doctor, baseModel, date, time) {
  const doctorData = await getUserByEmail(doctor.email);
  const randPatient = patientsFile[getRandomInt(0, 3)];
  console.log(`Generating for Patient ${randPatient.email}`);
  const userData = await getUserByEmail(randPatient.email);

  const randTreatment = treatmentsFile[getRandomInt(0, 3)];
  console.log(`Generating for treatement ${randTreatment.key}`);
  const treatmentData = await getTreatmentByKey(randTreatment.key);

  baseModel.date = date;
  baseModel.time = time;
  baseModel.doctor = getDoctorFields(doctorData[0]);
  baseModel.patient = getPatientFields(userData[0]);
  baseModel.doctor._id = doctorData[0].id;
  baseModel.patient._id = userData[0].id;
  baseModel.treatment = treatmentData.map(item => ({ _id: item.id, ...item }));
  baseModel.createddBy = userData[0].id;

  return baseModel;
}

async function processData(doctor, url, accessToken, date, time) {
  const model = await fillDatas(doctor, appointmentFile, date, time);
  return saveAppointment(url, accessToken, model);
}

async function process(limit) {
  const days = limit || moment()
    .add(3, 'months')
    .diff(moment(), 'days');
debugger;
  for (let i = 0; i < days; i += 1) {
    const randDoctor = doctorsFile[getRandomInt(0, 3)];
    console.log(`Generating for doctor ${randDoctor.name}`);
    const schedules = await getDoctorSchedule(randDoctor.email);
    const date = moment().add(i, 'day');
    const day = moment(date).day();
    const times = schedules.daily.find(item => item.day === day);

    const exceptionTimes = schedules.exception ? schedules.exception.find(item => item.day === day) : null;
    const appointmentToday = getRandomInt(0, 7);
    console.log(
      `appointmentToday: ${appointmentToday} day: ${day} date: ${moment(
        date
      ).format('YYYYMMDD')} times: ${JSON.stringify(times.time)}`
    );
    for (let x = 0; x <= appointmentToday; x += 1) {
      if (exceptionTimes && exceptionTimes.time.includes(times.time[x])) {
        console.log(`EXCLUDED >> time: ${times.time[x]}`);
        continue;
      }
      console.log(`time: ${times.time[x]}`);
      await processData(
        randDoctor,
        paths.appointments,
        TOKEN.USER,
        date,
        times.time[x]
      );
    }
  }
}

async function main() {
  const admin = await getAdminUser();
  const user = await getCommonUser();
  TOKEN.ADMIN = admin.token;
  TOKEN.USER = user.token;
  process(0);
}

main();
