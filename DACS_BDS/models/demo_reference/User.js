const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hash, compare} = require('bcrypt');
const UserSchema = new Schema({
   UserName:    { type: String, required: true },
   Password:    { type: String, required: true },
   Status: [{
    type: Schema.Types.ObjectId,
    ref: 'Status' // model status ..a can phai viet truoc
   }],
   warningFriends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
   }],
   Friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
   }]
});

