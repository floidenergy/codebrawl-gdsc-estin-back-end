const { Schema, model } = require('mongoose')

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    required: true,
    validator: [(arr) => { return arr.length <= 5 }, 'team members size exceeds the limit of 5 users']
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  submissions: {
    type: [{
      types: Schema.Types.ObjectId,
      ref: 'Submission'
    }],
    default: []
  },
  joiningcode: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
})

module.exports = model('Team', teamSchema);