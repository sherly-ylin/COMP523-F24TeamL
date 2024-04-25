import { Document, Error } from 'mongoose'
import { closedModel } from '../models/closedSchema.js'
import { environment } from '../../environment.js'
import { User } from '../models/userSchema.js'

/* Runs mongoose function to get all records from the database */
export async function getAllRecordsFromDB() {
  var signed_in_user = await User.findOne(
    { user_email: environment.user_email },
    (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Found ' + doc)
        } else {
          console.log(
            'Could not find user with email: ' + environment.user_email,
          )
        }
      }
    },
  ).clone()

  if (signed_in_user != null && (signed_in_user.role == 'superadmin' || signed_in_user.role == 'admin')) {
    console.log('🍎 I am superadmin/admin')
    var records = await closedModel
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
    var my_records = await closedModel
      .find(
        { user_email: environment.user_email },
        (err: Error, doc: Document) => {
          if (err) {
            throw err
          } else {
            if (doc) {
              console.log('Found ' + doc)
            } else {
              console.log(
                'Could not find records with user email: ' +
                  environment.user_email,
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
  var record = await closedModel
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

/* Runs mongoose function to add an entire record to the database */
export async function addRecordToDB(body: any) {
  var record = new closedModel(body)
  record.user_email = environment.user_email
  var status = await closedModel
    .findOne(body, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Record already exists.')
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
  var status = await closedModel
    .findOneAndUpdate({ uid: id }, body, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Sucessfully updated the record to: ' + doc)
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
  var status = await closedModel.findOne({ uid: id })

  await closedModel
    .findOneAndDelete({ uid: id }, (err: Error, doc: Document) => {
      if (err) {
        throw err
      } else {
        if (doc) {
          console.log('Successfully deleted record :' + doc)
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
  var records = await closedModel
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
