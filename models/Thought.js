const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is required',
    validate: [({ length }) => length <= 280, 'Thought can only be 280 characters.']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
    toJSON: {
        getters: true
    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;