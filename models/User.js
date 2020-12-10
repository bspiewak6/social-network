const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// get friend count 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, comment) => total + comment.friends.length + 1, 0);
});
  
// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
