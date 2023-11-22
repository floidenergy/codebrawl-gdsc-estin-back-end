const { Schema, model } = require('mongoose')

const submissionSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = model('Submission', submissionSchema);