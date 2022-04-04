const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    creator_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Task', taskSchema);