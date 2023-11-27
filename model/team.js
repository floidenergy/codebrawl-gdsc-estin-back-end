const { Schema, model } = require('mongoose')
const User = require('./user')

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
  submissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Submission'
  }],
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

teamSchema.methods.linkData = async function () {
  await this.populate(["members", "leader"]);

  if (this.submissions.length > 0)
    await this.populate("submissions");

  this.leader.preparePublicData();
  this.members = this.members.map(member => member.preparePublicData());
}

teamSchema.methods.addMember = async function (userid) {
  this.members.push(userid);
  await User.findByIdAndUpdate(userid, { $set: { team: this } })
  await this.save();
}

teamSchema.methods.removeMember = async function (userid) {
  let index = this.members.indexOf(userid);
  if (index > -1) {
    await User.findByIdAndUpdate(userid, { $unset: { team: 1 } })
    this.members.splice(index, 1);
    await this.save();
  } else {
    console.log('no user found');
  }
};

module.exports = model('Team', teamSchema);