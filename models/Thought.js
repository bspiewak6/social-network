const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use Moment.js to format createdAt date
        get: createdAtVal => moment(createdAtVal).format("LLL")
    }
  },
    {
      toJSON: {
        getters: true
    }
});

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
    // use Moment.js to format createdAt date
    get: createdAtVal => moment(createdAtVal).format("LLL")
  },
  username: {
    type: String,
    required: true,
  },
   // use ReactionSchema to validate data for a reaction to thoughts
   reactions: [ReactionSchema]
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