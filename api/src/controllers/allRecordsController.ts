// Import all the required services at the top of your controller file
import { Request, Response } from 'express'
import * as IPSLogServices from '../services/IPSLogServices.js'
import * as jobDevServices from '../services/jobDevServices.js'
import * as personLevelServices from '../services/personLevelServices.js'
import * as staffingServices from '../services/staffingServices.js'
import * as closedServices from '../services/closedServices.js'
import { environment } from '../../environment.js'

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

export async function getPendingRecordsCounts(req: Request, res: Response) {
  try {
    const currentUser = req.body.user // Assuming `req.user` contains logged-in user info
    if (!currentUser || currentUser.role !== 'provider') {
      return res.status(403).json({ success: false, msg: 'Unauthorized or invalid role' })
    }

    const team_id = currentUser.team_id // Team ID for the provider
    if (!team_id) {
      return res.status(400).json({ success: false, msg: 'Team ID is required' })
    }

    // Fetch pending reviews from each service
    const closedPendingReviews = await closedServices.getPendingReviews(team_id)
    const IPSLogPendingReviews = await IPSLogServices.getPendingReviews(team_id)
    const jobDevPendingReviews = await jobDevServices.getPendingReviews(team_id)
    const personLevelPendingReviews = await personLevelServices.getPendingReviews(team_id)
    const staffingPendingReviews = await staffingServices.getPendingReviews(team_id)

    // Return 
    res.status(200).json({
      success: true,
      closedPendingReviews,
      IPSLogPendingReviews,
      jobDevPendingReviews,
      personLevelPendingReviews,
      staffingPendingReviews
    })
  } catch (err) {
    console.error('Error retrieving pending records counts:', err)
    res.status(500).json({ success: false, msg: 'Failed to retrieve pending reviews.' })
  }
}

export async function setupReview(req: Request, res: Response) {
  try {
    const { review_type, team_id } = req.body;

    // Validate input
    if (!review_type || !team_id) {
      return res.status(400).json({ success: false, msg: 'Review type and team_id are required' });
    }

    const admin_id = environment.currentId; // Assuming `req.user` contains logged-in user info
    if (!admin_id) {
      return res.status(403).json({ success: false, msg: 'Unauthorized' });
    }

    const non_review: any = {
      admin_id: admin_id,
      team_id: team_id,
      assigned_date: new Date().toLocaleString(),
      status: 'PENDING',
      // login: String,
      // password: String
    }

    // Call service function to create the review
    if(review_type == "closed") {
      await closedServices.addRecordToDB(non_review)
    }
    else if(review_type == "ips") {
      await IPSLogServices.addRecordToDB(non_review)
    }
    else if(review_type == "person") {
      await personLevelServices.addRecordToDB(non_review)
    }
    else if(review_type == "jobdev") {
      await jobDevServices.addRecordToDB(non_review)
    }
    else if(review_type == "staffing") {
      await staffingServices.addRecordToDB(non_review)
    }

    // Respond with the newly created review
    res.status(201).json({
      success: true,
      msg: 'Review successfully created'
    });
  } catch (err) {
    console.error('Error setting up review:', err);
    res.status(500).json({ success: false, msg: 'Failed to set up review.' });
  }
}