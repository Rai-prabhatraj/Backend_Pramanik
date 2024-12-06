
const documentSchema = require('../models/documentModel');

exports.saveData = async (data) => {
    try {
      
        const newData = new documentSchema(data);


        return await newData.save();
    } catch (error) {
        console.error('Error in saveData service:', error);
        throw new Error('Database operation failed');
    }
};
