const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is required',
    validate: [({ length }) => length <= 280, 'Thought must only have 280 characters.']
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
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
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;