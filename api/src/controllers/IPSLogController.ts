import { Request, Response } from 'express'
import * as IPSLogServices from '../services/IPSLogServices.js'
import mongoose from 'mongoose'

/* Get all controller to retrieve all records. Result variable checks for success. */
export async function getAllRecords(_: Request, res: Response) {
  try {
    var result = await IPSLogServices.getAllRecordsFromDB()
    if (result) {
      res.status(200).jsonp(result)
    } else {
      res.status(200).json({ success: true, msg: 'No records found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to retrieve records.' })
  }
}

/* Get specific record controller to retrieve a record. Result variable checks for success. */
export async function getRecord(req: Request, res: Response) {
  var id = req.params.id
  try {
    var result = await IPSLogServices.getRecordFromDB(id)
    if (result) {
      res.status(200).jsonp(result)
    } else {
      res.status(200).json({ success: true, msg: 'Record not found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to retrieve record.' })
  }
}

export async function getRecordByAdmin_ID(req: Request, res: Response) {
  const admin_id = req.body.admin_id
  try {
    const result = await IPSLogServices.getRecordsByAdmin_ID(admin_id)
    if (result) {
      res.status(200).jsonp(result)
    } else {
      res.status(200).json({ success: true, msg: 'Records not found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to retrieve records.' })
  }
}

export async function getRecordByTeam_ID(req: Request, res: Response) {
  const team_id = req.body.team_id
  try {
    const result = await IPSLogServices.getRecordsByTeam_ID(team_id)
    if (result) {
      res.status(200).jsonp(result)
    } else {
      res.status(200).json({ success: true, msg: 'Records not found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to retrieve records.' })
  }
}

/* Add a record controller to add a record. Status variable checks for success. */
export async function addRecord(req: Request, res: Response) {
  var body = req.body
  try {
    var status = await IPSLogServices.addRecordToDB(body)
    if (status) {
      res.status(200).json({ success: true, msg: 'Record already exists.' })
    } else {
      res.status(200).json({ success: true, msg: 'Record added.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to add record.' })
  }
}

/* Update a record controller to update a record. Status variable checks for success. */
export async function updateRecord(req: Request, res: Response) {
  var id = req.params.id
  var body = req.body

  try {
    if (body._id && !mongoose.Types.ObjectId.isValid(body._id)) {
      return res.status(400).json({ success: false, msg: 'Invalid team_id format.' });
    }

    if (body.admin_id && !mongoose.Types.ObjectId.isValid(body.admin_id)) {
      return res.status(400).json({ success: false, msg: 'Invalid admin_id format.' });
    }

    if (body.users) {
      for (const userId of body.users) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ success: false, msg: 'Invalid user ID in users array.' });
        }
      }
    }

    var status = await IPSLogServices.updateRecordInDB(id, body)
    if (status) {
      res
        .status(200)
        .json({ success: true, msg: 'Successfully updated the record.' })
    } else {
      res.status(200).json({ success: true, msg: 'Record not found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to update record.' })
  }
}

/* Delete a record controller to delete a record. Status variable checks for success. */
export async function deleteRecord(req: Request, res: Response) {
  var id = req.params.id
  try {
    var status = await IPSLogServices.deleteRecordFromDB(id)
    if (status) {
      res.status(200).json({ success: true, msg: 'Record deleted.' })
    } else {
      res.status(200).json({ success: true, msg: 'Record not found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to delete record.' })
  }
}

/* Delete all records controller to delete all records. Result variable checks for success. */
export async function deleteAllRecords(_: Request, res: Response) {
  try {
    var result = await IPSLogServices.deleteAllRecordsFromDB()
    if (result) {
      res.status(200).jsonp(result)
    } else {
      res.status(200).json({ success: true, msg: 'No records found.' })
    }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to delete records.' })
  }
}
