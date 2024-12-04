import { Document, Error, Types } from 'mongoose'
import { environment } from '../../environment.js'
import { jobDevModel } from '../models/jobDevSchema.js'
import { User } from '../models/userSchema.js'

/* Runs mongoose function to get all records from the database */
export async function getAllRecordsFromDB() {
  var signed_in_user = await User.findOne(
    { user_email: environment.currentEmail },
    (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Found ' + doc)
        } else {
          console.log(
            'Could not find user with email: ' + environment.currentEmail,
          )
        }
      }
    },
  ).clone()

  if (
    signed_in_user != null &&
    (signed_in_user.role == 'superadmin' || signed_in_user.role == 'admin')
  ) {
    console.log('🍎 I am superadmin/admin')
    var records = await jobDevModel
      .find(function (err, docs) {
        if (err) {
          throw err
        } else {
          if (docs) {
            console.log('Found all records.')
          } else {
            console.log('No records found.')
          }
        }
      })
      .clone()
    return records
  } else if (signed_in_user != null && signed_in_user.role == 'provider') {
    console.log('🍎 I am provider')
    var my_records = await jobDevModel
      .find(
        { user_email: environment.currentEmail },
        (err: Error, doc: Document) => {
          if (err) {
            throw err
          } else {
            if (doc) {
              console.log('Found ' + doc)
            } else {
              console.log(
                'Could not find records with user email: ' +
                  environment.currentEmail,
              )
            }
          }
        },
      )
      .clone()
    return my_records
  }
}

/* Runs mongoose function to find a specific record */
export async function getRecordFromDB(id: string) {
  var record = await jobDevModel
    .findOne({ uid: id }, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Found ' + doc)
        } else {
          console.log('Could not find record with uid: ' + id)
        }
      }
    })
    .clone()

  return record
}

export async function getRecordsByAdmin_ID(admin_id: Types.ObjectId) {
  try {
    const records = await jobDevModel.find({ admin_id: admin_id }).exec()

    if (records.length > 0) {
      console.log(`Found ${records.length} records for admin_id: ${admin_id}`)
    } else {
      console.log(`No records found with admin_id: ${admin_id}`)
    }

    return records
  } catch (err) {
    console.error('Error fetching records by admin_id:', err)
    throw err
  }
}

export async function getRecordsByTeam_ID(team_id: Types.ObjectId) {
  try {
    const records = await jobDevModel.find({ team_id: team_id }).exec()

    if (records.length > 0) {
      console.log(`Found ${records.length} records for team_id: ${team_id}`)
    } else {
      console.log(`No records found with team_id: ${team_id}`)
    }

    return records
  } catch (err) {
    console.error('Error fetching records by team_id:', err)
    throw err
  }
}

/* Runs mongoose function to add an entire record to the database */
export async function addRecordToDB(body: object) {
  var record = new jobDevModel(body)
  record.user_email = environment.currentEmail
  console.log('🍎' + environment.currentEmail)
  var status = await jobDevModel
    .findOne(body, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Record already exists')
        } else {
          record.save(function (err, doc) {
            if (err) {
              throw err
            } else {
              console.log('Added ' + doc)
            }
          })
        }
      }
    })
    .clone()

  return status
}

/* Runs mongoose function that finds a record by an ID and updates it with whatever input */
export async function updateRecordInDB(id: string, body: object) {
  var status = await jobDevModel
    .findOneAndUpdate({ uid: id }, body, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Successfully updated the record to: ' + doc)
        } else {
          console.log('No record found to update.')
        }
      }
    })
    .clone()

  return status
}

/* Runs mongoose function to find a record by an ID and delete it */
export async function deleteRecordFromDB(id: string) {
  var status = await jobDevModel.findOne({ uid: id })

  await jobDevModel
    .findOneAndDelete({ uid: id }, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Successfully deleted record: ' + doc)
        } else {
          console.log('No record found to delete.')
        }
      }
    })
    .clone()

  return status
}

/* Runs mongoose function to delete all records in the database */
export async function deleteAllRecordsFromDB() {
  var records = await jobDevModel
    .deleteMany({}, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Deleted all records.')
        } else {
          console.log('No records found.')
        }
      }
    })
    .clone()

  return records
}

export async function getReviewCounts(user: any) {
  try {
    // Determine filter criteria based on user's role
    let filter = {};
    if (user.role === 'superadmin' || user.role === 'admin') {
      // Superadmin/Admin can see all records
      filter = {};
    } else if (user.role === 'provider' && user.team_id) {
      // Provider can only see records assigned to their team
      filter = { team_id: user.team_id };
    } else {
      // Fallback for unauthorized access
      return { completed: 0, incomplete: 0 };
    }

    // Query for completed and incomplete records
    const completedCount = await jobDevModel.countDocuments({
      ...filter,
      status: 'completed', // Assuming a 'status' field exists to indicate completion
    }).exec();

    const incompleteCount = await jobDevModel.countDocuments({
      ...filter,
      status: 'incomplete', // Assuming a 'status' field exists to indicate incompletion
    }).exec();

    return { total: completedCount + incompleteCount, completed: completedCount, incomplete: incompleteCount };
  } catch (err) {
    console.error('Error in getReviewCounts:', err);
    throw err;
  }
}