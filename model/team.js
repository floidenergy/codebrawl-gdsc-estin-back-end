const { Schema, model } = require('mongoose')
const { prepareUser } = require('../controllers/utils')

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
      type: Schema.Types.ObjectId,
      ref: 'Submission'
    }],
    default: []
  },
  joiningcode: {
    type: String,
    unique: true
  },
  chosenCategory: {
    type: String,
    enum: ['WEB', 'MOBILE', 'MOBILE', "AI", "BLOCKCHAIN", "DATASCIENCE"],
    required: true
  }
}, {
  timestamps: true
})

teamSchema.pre("init", async (next) => {
  await this.populate(["members", "leader", "submission"]);
  this.leader.prepareUser();
  this.members.forEach(member => member.prepareUser());
  next();
} )
// add methods to schema
teamSchema.methods.addMember = (userid) => {
  this.members.push(userid);
}
teamSchema.methods.removeMember = (userid) => {
  let index = this.members.indexOf(userid);
  if (index > -1) {
    this.members.splice(index, 1);
  } else {
    console.log('no user found');
  }
};

module.exports = model('Team', teamSchema);