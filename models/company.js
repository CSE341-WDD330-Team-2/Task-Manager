const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
   company_name: {
      type: String,
      required: true,
   },
   logo: {
      type: String,
      required: true,
   },
   employees: [
     {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
     }
   ],
   tasks: [
      {
         type: Schema.Types.ObjectId,
         ref: "Task"
      },
   ],
});

module.exports = mongoose.model('Company', companySchema)