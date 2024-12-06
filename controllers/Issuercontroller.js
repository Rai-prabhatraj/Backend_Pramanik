const app_constant = require("../constants/app.json")
const userServices = require("../services/userServices")
const issuerservice = require("../services/issuerservices")
const validationHelper = require("../helpers/validation")

exports.saveData = async (req, res) => {
    try {
        const { account, receiver, cid, signature, message } = req.body;

        // Validate the input
        if (!account || !receiver || !cid || !signature || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Call the service to save data
        const savedData = await issuerservice.saveData({ account, receiver, cid, signature, message });

        res.status(201).json({ message: 'Data successfully saved', data: savedData });
    } catch (error) {
        console.error('Error in saveData controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};