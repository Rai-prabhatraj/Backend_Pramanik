

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    verifyingAuthorityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    issuingAuthorityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
      type: String, 
      enum: ['pending', 'verified', 'issued', 'rejected'], 
      default: 'pending' 
    },
    details: { type: Map, of: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Application', applicationSchema);
  