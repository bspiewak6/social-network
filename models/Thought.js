const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is required',
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true,
  },
   // use ReactionSchema to validate data for a reaction to thoughts
  // reactions: [ReactionSchema]
  },
  {
      toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of reactions
// ThoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;