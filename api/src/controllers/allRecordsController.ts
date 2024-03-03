// Import all the required services at the top of your controller file
import { Request, Response } from 'express'
import * as IPSLogServices from '../services/IPSLogServices.js'
import * as jobDevServices from '../services/jobDevServices.js'
import * as personLevelServices from '../services/personLevelServices.js'
import * as staffingServices from '../services/staffingServices.js'

// New controller function to aggregate all records
export async function getAllRecordsFromAllServices(
  req: Request,
  res: Response,
) {
  try {
    // Retrieve all records from each service
    const ipsLogRecords = await IPSLogServices.getAllRecordsFromDB()
    const jobDevRecords = await jobDevServices.getAllRecordsFromDB()
    const personLevelRecords = await personLevelServices.getAllRecordsFromDB()
    const staffingRecords = await staffingServices.getAllRecordsFromDB()

    // Combine all records into a single array (or object, depending on your preference)
    const allRecords = {
      ipsLogRecords,
      jobDevRecords,
      personLevelRecords,
      staffingRecords,
    }

    // Send the combined records as a response
    res.status(200).json({ success: true, data: allRecords })
  } catch (e) {
    const err = e as Error
    console.error(err.message)
    res
      .status(500)
      .json({ success: false, msg: 'Failed to retrieve all records.' })
  }
}
