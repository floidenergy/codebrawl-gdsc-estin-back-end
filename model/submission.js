const { Schema, model } = require('mongoose')
const { prepareUser } = require('../controllers/utils')

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


submissionSchema.methods.updateScore = async (score) => {
  this.score += score;
  await this.save();
}

submissionSchema.pre("init", async (next) => {
  await this.populate(['team', 'submitter']);
  this.submitter.prepareUser();
  next()
})
module.exports = model('Submission', submissionSchema);