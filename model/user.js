const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  }
}, {
  timestamps: true
})

userSchema.methods.prepareData = function () {;

  this.hash = undefined;
  this.salt = undefined;
  this.createdAt = undefined;
  this.updatedAt = undefined;
  this.__v = undefined;
  return this
}

userSchema.methods.preparePublicData = function () {
  this.prepareData();
  this.email = undefined;

  return this
}

module.exports = model('User', userSchema)