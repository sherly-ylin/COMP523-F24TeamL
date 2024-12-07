import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { staffingModel } from '../models/staffingSchema'
import * as staffingServices from '../services/staffingServices'

dotenv.config()
const { DATABASE_URI = '' } = process.env

/*test('test template', async () => {0
    try {
        await mongoose.connect(DATABASE_URI);
        console.log("Successfully connected to the server");
    } catch (e) {
       const err = e as Error
    console.error(err.message);
    }

    mongoose.disconnect();
});*/

test('clear database', async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log('Successfully connected to the server')
  } catch (e) {
    const err = e as Error
    console.error(err.message)
  }
  console.log('clearing database')
  await staffingModel.deleteMany()
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
  const staffingtest = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 1',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest).then((status) => {
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
  const staffingtest = new Object({
    eval_dates: ['EVAL STRING 1 WITH MISSING AGENCY NAME', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 2',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest).then((status) => {
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
  const staffingtest = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1 WITH PRESENT AGENCY NAME', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 2',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices
    .updateRecordInDB('name 2', staffingtest)
    .then((status) => {
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
  const staffingtest1 = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 3',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest1)
  const staffingtest2 = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 4',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest2)
  const staffingtest3 = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 5',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest3)
  const staffingtest4 = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 6',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest4)
  const staffingtest5 = new Object({
    agency_name: 'AGENCY NAME STRING',
    eval_dates: ['EVAL STRING 1', 'EVAL STRING 2'],
    date_completed: 'DATE COMPLETED STRING',
    staff_name: 'name 7',
    job_titles: 'JOB TITLES STRING',
    other_roles: 'OTHER ROLES STRING',
    time_spent: 1,
    start_date: 'START DATE STRING',
    end_date: 'END DATE STRING',
    hours_worked: 20,
    IPS_training: ['IPS TRAINING STRING 1', 'IPS TRAINING STRING 2'],
  })
  await staffingServices.addRecordToDB(staffingtest5)
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
  await staffingServices.getAllRecordsFromDB().then((status) => {
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
  await staffingServices.getRecordFromDB('name 6').then((status) => {
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
  await staffingServices.getRecordFromDB('name 8').then((status) => {
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
  await staffingServices.deleteRecordFromDB('name 7').then((status) => {
    expect(status).not.toBeNull()
  })
  mongoose.disconnect()
})


test('retrieve records by admin_id', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
  
  const adminId = new mongoose.Types.ObjectId();
  const testRecords = [
    { admin_id: adminId, staff_name: 'admin record 1', status: 'completed' },
    { admin_id: adminId, staff_name: 'admin record 2', status: 'incomplete' },
  ];

  await staffingModel.insertMany(testRecords);
  const records = await staffingServices.getRecordsByAdmin_ID(adminId);
  
  expect(records).toHaveLength(2);
  expect(records[0].staff_name).toBe('admin record 1');
  expect(records[1].staff_name).toBe('admin record 2');
  
  mongoose.disconnect();
});


test('retrieve records by team_id', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
  
  const teamId = new mongoose.Types.ObjectId();
  const testRecords = [
    { team_id: teamId, staff_name: 'team record 1', status: 'pending' },
    { team_id: teamId, staff_name: 'team record 2', status: 'completed' },
  ];

  await staffingModel.insertMany(testRecords);
  const records = await staffingServices.getRecordsByTeam_ID(teamId);
  
  expect(records).toHaveLength(2);
  expect(records[0].staff_name).toBe('team record 1');
  expect(records[1].status).toBe('completed');
  
  mongoose.disconnect();
});


test('retrieve review counts', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
  
  const testRecords = [
    { status: 'completed', staff_name: 'record 1' },
    { status: 'completed', staff_name: 'record 2' },
    { status: 'incomplete', staff_name: 'record 3' },
  ];

  await staffingModel.insertMany(testRecords);
  const counts = await staffingServices.getReviewCounts({ role: 'superadmin' });
  
  expect(counts.total).toBe(3);
  expect(counts.completed).toBe(2);
  expect(counts.incomplete).toBe(1);
  
  mongoose.disconnect();
});


test('retrieve records by admin_id with no results', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }

  const adminId = new mongoose.Types.ObjectId();
  const records = await staffingServices.getRecordsByAdmin_ID(adminId);
  
  expect(records).toHaveLength(0);
  
  mongoose.disconnect();
});


test('retrieve pending reviews', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
  
  const teamId = new mongoose.Types.ObjectId();
  const testRecords = [
    { team_id: teamId, staff_name: 'pending record 1', status: 'pending' },
    { team_id: teamId, staff_name: 'pending record 2', status: 'pending' },
  ];

  await staffingModel.insertMany(testRecords);
  const pendingReviews = await staffingServices.getPendingReviews(teamId);
  
  expect(pendingReviews).toHaveLength(2);
  expect(pendingReviews[0].status).toBe('pending');
  
  mongoose.disconnect();
});


test('unauthorized user retrieves no records', async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log('Successfully connected to the server');
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
  }
  
  const user = { role: 'unauthorized', team_id: null };
  const counts = await staffingServices.getReviewCounts(user);
  
  expect(counts.completed).toBe(0);
  expect(counts.incomplete).toBe(0);
  
  mongoose.disconnect();
});


