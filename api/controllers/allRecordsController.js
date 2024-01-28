// Import all the required services at the top of your controller file
const IPSLogServices = require('../services/IPSLogServices');
const jobDevServices = require('../services/jobDevServices');
const personLevelServices = require('../services/personLevelServices');
const staffingServices = require('../services/staffingServices');


// New controller function to aggregate all records
async function getAllRecordsFromAllServices(req, res) {
    try {
        // Retrieve all records from each service
        const ipsLogRecords = await IPSLogServices.getAllRecordsFromDB();
        const jobDevRecords = await jobDevServices.getAllRecordsFromDB();
        const personLevelRecords = await personLevelServices.getAllRecordsFromDB();
        const staffingRecords = await staffingServices.getAllRecordsFromDB();

        // Combine all records into a single array (or object, depending on your preference)
        const allRecords = {
            ipsLogRecords,
            jobDevRecords,
            personLevelRecords,
            staffingRecords
        };

        // Send the combined records as a response
        res.status(200).json({ success: true, data: allRecords });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ success: false, msg: 'Failed to retrieve all records.' });
    }
}

module.exports = {
    getAllRecordsFromAllServices
};
