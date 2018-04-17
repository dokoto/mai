import request from 'request-promise';
import moment from 'moment';
import _ from 'lodash';

const appointmentData = require('./appointmentBase.json');
const doctorsData = require('./doctors.json');
const patientsData = require('./patients.json');
const treatmentsData = require('./treatments.json');

const TOKEN = {
  SUPER: 'xYZsKt2o035xYXvZj2hzrYoQR1MJKaR7',
  MASTER: 'VgMXmke7Lz9KQLMhaYPNIJ5nwZKqpTGE',
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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

async function fillDatas(doctorBase, baseModel, date, time) {
  const patientBase = patientsData[getRandomInt(0, patientsData.length - 1)];
  const doctor = await getUserByEmail(doctorBase.email);
  const user = await getUserByEmail(patientBase.email);
  const treatment = await getTreatmentByKey(baseModel.treatment[0].key);

  baseModel.date = date;
  baseModel.time = time;
  baseModel.doctor = getDoctorFields(doctorBase);
  baseModel.patient = getPatientFields(patientBase);
  baseModel.doctor._id = doctor[0].id;
  baseModel.patient._id = user[0].id;
  baseModel.treatment = treatment.map(item => ({ _id: item.id, ...item }));
  baseModel.createddBy = user[0].id;

  return baseModel;
}

async function processData(doctor, url, accessToken, date, time) {
  const model = await fillDatas(doctor, appointmentData, date, time);
  return saveAppointment(url, accessToken, model);
}

async function process(doctor, limit) {
  const days = limit || moment()
    .add(3, 'months')
    .diff(moment(), 'days');
  const schedules = await getDoctorSchedule(appointmentData.doctor.email);

  for (let i = 0; i < days; i += 1) {
    const date = moment().add(i, 'day');
    const day = moment(date).day();
    const times = schedules.daily.find(item => item.day === day);
    const appointmentToday = getRandomInt(1, 7);
    console.log(
      `appointmentToday: ${appointmentToday} day: ${day} date: ${moment(
        date
      ).format('YYYYMMDD')} times: ${JSON.stringify(times.time)}`
    );
    for (let x = 1; x <= appointmentToday; x += 1) {
      console.log(`day: ${x} time: ${times.time[x]}`);
      await processData(
        doctor,
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
  process(doctorsData[0], 0);
  process(doctorsData[1], 0);
  process(doctorsData[2], 0);
}

main();
