import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { jobDevModel } from '../models/jobDevSchema'
import * as jobDevServices from '../services/jobDevServices'

dotenv.config()
const { DATABASE_URI = '' } = process.env

test('clear database', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('clearing database')
  await jobDevModel.deleteMany()
  mongoose.disconnect()
})

test('add record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('add record test')
  const JobDevTest = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 1,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest).then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})

test('add unformatted record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('add unformatted record test')
  const JobDevTest = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 2,
    employer_contacted: 'CONTACTED STRING with no goal string',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest).then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})

test('update record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('update record test')
  const JobDevTest = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 2,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.updateRecordInDB('2', JobDevTest).then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})

test('add multiple records', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('add multiple records test')
  const JobDevTest1 = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 3,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest1)
  const JobDevTest2 = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 4,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest2)
  const JobDevTest3 = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 5,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest3)
  const JobDevTest4 = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 6,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest4)
  const JobDevTest5 = new Object({
    date_participated: ['DATE 1', 'DATE 2'],
    uid: 7,
    employment_goal: 'EMPLOYMENT GOAL STRING',
    employer_contacted: 'CONTACTED STRING',
    employer_hiring: true,
    contact_method: 'CONTACT METHOD STRING',
    date_of_contact: 'DATE OF CONTACT STRING',
    nature_of_visit: 'NATURE OF VISIT STRING',
    visit_desc: 'VISIT DESC STRING',
  })
  await jobDevServices.addRecordToDB(JobDevTest5)
  mongoose.disconnect()
})

test('retrieve all records', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('view all records')
  await jobDevServices.getAllRecordsFromDB().then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})

test('retrieve 1 record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('view record 6')
  await jobDevServices.getRecordFromDB('6').then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})

test('retrieve non-existant record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('view non-existant record')
  await jobDevServices.getRecordFromDB('8').then((status) => {
    expect(status).toBeNull()
  })
  mongoose.disconnect()
})

test('delete a record', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('delete record 7')
  await jobDevServices.deleteRecordFromDB('7').then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})
