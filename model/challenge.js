const { Schema, model } = require('mongoose')

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['WEB', 'MOBILE', 'MOBILE', "AI", "BLOCKCHAIN", "DATASCIENCE"],
    required: true
  },
  difficulty: {
    /** difficulties are
     * 0 easy
     * 1 mid
     * 3 hard
     * 4 monster
     */
    type: Number,
    min: [0, "difficulty must be min of 0"],
    max: [4, "difficulty must be max of 4"],
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
  {
    timestamps: true
  })

module.exports = model('Challenge', challengeSchema);