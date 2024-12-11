
const authService = require('../services/userServices');
const DocumentRequest = require("../models/documentrequestModel");
const createIssue = require("../models/IssueModel")

const signup = async (req, res) => {
  try {
    const token = await authService.signup(req.body);
    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIssuedDocuments = async (req, res) => {
  try {
  
    const receiver = req.body.receiver

    if (!receiver) {
      return res.status(400).json({error : "User not authenticated"})
    }

    const documents = await authService.getIssuedDocuments(receiver)

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching issued documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewDocument = async (req, res) => {
     try {
        const cid = req.body.cid 

        if (!cid) {
          return res.status(400).json({error : "User not authenticated"})
        }

        const gateway = "https://silver-patient-scallop-975.mypinata.cloud/ipfs/";

        const url = `${gateway}${cid}`

        res.status(200).json(url)
        // res.status(302).redirect(url)
     }
     catch (error) {
      console.error("Error fetching issued documents:", error);
      res.status(500).json({ error: "Internal Server Error" });
     }
}



const requestDocument = async (req, res) => {
  try {
    const { userId, type, documentName, details } = req.body; 
    const request = new DocumentRequest({
      userId,
      type,
      documentName,
      details,
      status: "pending",
    });

    await request.save();

    res.status(201).json({ message: "Request submitted successfully", request });
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
};

const postIssue = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const issueData = {
      userId,
      title,
      description,
      status: "pending",
    };

    const issue = await createIssue(issueData);
    res.status(201).json({ message: "Issue submitted successfully", issue });
  } catch (err) {
    console.error("Error in postIssue controller:", err.message);
    res.status(500).json({ error: "Failed to submit issue" });
  }
};


module.exports = { signup, login, getIssuedDocuments, requestDocument,postIssue,viewDocument };


