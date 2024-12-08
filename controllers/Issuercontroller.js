const app_constant = require("../constants/app.json")
const userServices = require("../services/userServices")
const validationHelper = require("../helpers/validation")
const { fetchAllDocumentRequests, saveData,fetchAllIssues,createIssue,fetchAllTasks } = require("../services/issuerservices");
// const issuerservice = require("../services/issuerservices");

const saveDocument = async (req, res) => {
    try {
        const { account, receiver, cid, signature, message } = req.body;

        if (!account || !receiver || !cid || !signature || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const savedData = await saveData({ account, receiver, cid, signature, message });

        res.status(201).json({ message: 'Data successfully saved', data: savedData });
    } catch (error) {
        console.error('Error in saveData controller:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllDocumentRequests = async (req, res) => {
  try {
      const documentRequests = await fetchAllDocumentRequests();
      if (!documentRequests) {
          return res.status(404).json({ error: 'No document requests found' });
      }
      res.status(200).json({ message: 'Document requests fetched successfully', requests: documentRequests });
  } catch (err) {
      console.error('Error in getAllDocumentRequests:', err.message);
      res.status(500).json({ error: 'Failed to fetch document requests' });
  }
};

const getAllIssues = async (req, res) => {
  try {
      const issues = await fetchAllIssues();
      if (!issues) {
          return res.status(404).json({ error: 'No issues found' });
      }
      res.status(200).json({ message: 'Issues fetched successfully', issues });
  } catch (err) {
      console.error('Error in getAllIssues:', err.message);
      res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await fetchAllTasks();
        res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        console.error('Error in getTasks controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {saveDocument,getAllDocumentRequests,getAllIssues,getTasks
};




