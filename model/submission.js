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
  repoLink: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["PENDING", "REVIEWED"],
    default: "PENDING"
  }
}, {
  timestamps: true
})

module.exports = model('Submission', submissionSchema);