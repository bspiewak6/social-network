const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: 'username is required',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'email is required',
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    // thoughts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Thought'
    //     }
    // ],
    // friends: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
    //     toJSON: {
    //         virtuals: true
    //     },
    //     id: false
});

// virtual to get friend count
// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.reduce((total, comment) => total + comment.friends.length + 1, 0);
// });
  
// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
