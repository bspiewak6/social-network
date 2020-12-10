const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is required',
    validate: [({ length }) => length <= 280, 'Thought can only be 280 characters.']
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // reactions: [ReactionSchema]
  },
  {
      toJSON: {
        getters: true
    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;