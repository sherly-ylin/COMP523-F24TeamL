// Import all the required services at the top of your controller file
import { Request, Response } from 'express'
import * as IPSLogServices from '../services/IPSLogServices.js'
import * as jobDevServices from '../services/jobDevServices.js'
import * as personLevelServices from '../services/personLevelServices.js'
import * as staffingServices from '../services/staffingServices.js'
import * as closedServices from '../services/closedServices.js'

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

export async function getRecordsCounts(req: Request, res: Response) {
  try {
    const currentUser = req.body.user; // Assuming `req.user` contains the logged-in user info
    if (!currentUser) {
      return res.status(403).json({ success: false, msg: 'Unauthorized' });
    }

    // Initialize counts
    let total = 0;
    let complete = 0;
    let incomplete = 0;

    // Fetch counts from each review service
    const closedCounts = await closedServices.getReviewCounts(currentUser);
    total += closedCounts.completed + closedCounts.incomplete;
    complete += closedCounts.completed;
    incomplete += closedCounts.incomplete;

    const ipsLogCounts = await IPSLogServices.getReviewCounts(currentUser); // Example for another service
    total += ipsLogCounts.completed + ipsLogCounts.incomplete;
    complete += ipsLogCounts.completed;
    incomplete += ipsLogCounts.incomplete;

    const jobDevCounts = await jobDevServices.getReviewCounts(currentUser); // Example for another service
    total += jobDevCounts.completed + jobDevCounts.incomplete;
    complete += jobDevCounts.completed;
    incomplete += jobDevCounts.incomplete;

    const personLevelCounts = await personLevelServices.getReviewCounts(currentUser); // Example for another service
    total += personLevelCounts.completed + personLevelCounts.incomplete;
    complete += personLevelCounts.completed;
    incomplete += personLevelCounts.incomplete;

    const staffingCounts = await staffingServices.getReviewCounts(currentUser); // Example for another service
    total += staffingCounts.completed + staffingCounts.incomplete;
    complete += staffingCounts.completed;
    incomplete += staffingCounts.incomplete;

    // Return aggregated results
    res.status(200).json({
      total,
      complete,
      incomplete,
    });
  } catch (e) {
    const err = e as Error;
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Failed to retrieve review counts.' });
  }
}