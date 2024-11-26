const mongoose = require('mongoose');

// Define the Assignment Schema
const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Due date must be a future date',
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Add a method to update status
AssignmentSchema.methods.markAsCompleted = function () {
  this.status = 'Completed';
  return this.save();
};

// Static method to find overdue assignments
AssignmentSchema.statics.findOverdueAssignments = function () {
  return this.find({ dueDate: { $lt: new Date() }, status: 'Pending' });
};

// Export the model
module.exports = mongoose.model('Assignment', AssignmentSchema);
