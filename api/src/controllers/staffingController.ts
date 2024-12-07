import { Request, Response } from 'express'
import mongoose from 'mongoose'
import * as staffingServices from '../services/staffingServices.js'
import jwt from 'jsonwebtoken'

/* Get all controller to retrieve all records. Result variable checks for success. */
export async function getAllRecords(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Decode the JWT to extract user info
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!); // Replace with your JWT secret
    const {userId} = decodedToken as {
      userId: string;
    };

    // Pass extracted info to the service layer
    const records = await staffingServices.getAllRecordsFromDB(userId);
    res.status(200).json(records);
    // var result = await staffingServices.getAllRecordsFromDB()
    // if (result) {
    //   res.status(200).jsonp(result)
    // } else {
    //   res.status(200).json({ success: true, msg: 'No records found.' })
    // }
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res.status(500).json({ success: false, msg: 'Failed to retrieve records.' })
  }
}

/* Get specific record controller to retrieve a record. Result variable checks for success. */
export async function getMyRecords(req: Request, res: Response) {
  var id = req.params.id
  try {
    var result = await staffingServices.getRecordFromDB(id)
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

/* Get specific record controller to retrieve a record. Result variable checks for success. */
export async function getRecord(req: Request, res: Response) {
  var id = req.params.id
  try {
    var result = await staffingServices.getRecordFromDB(id)
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
    const result = await staffingServices.getRecordsByAdmin_ID(admin_id)
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
    const result = await staffingServices.getRecordsByTeam_ID(team_id)
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
    var status = await staffingServices.addRecordToDB(body)
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
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid team_id format.' })
    }

    if (body.admin_id && !mongoose.Types.ObjectId.isValid(body.admin_id)) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid admin_id format.' })
    }

    if (body.users) {
      for (const userId of body.users) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res
            .status(400)
            .json({ success: false, msg: 'Invalid user ID in users array.' })
        }
      }
    }

    var status = await staffingServices.updateRecordInDB(id, body)
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
    var status = await staffingServices.deleteRecordFromDB(id)
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
export async function deleteAllRecords(req: Request, res: Response) {
  try {
    var result = await staffingServices.deleteAllRecordsFromDB()
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
