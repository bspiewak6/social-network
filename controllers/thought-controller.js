const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path:'reactions',
      select: '-__v'
    })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  // GET one thought by id 
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path:'reactions',
      select: '-__v'
    })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  // CREATE thought and push to user 
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'Your thought was created!'});
      })
      .catch(err => res.json(err));
  },

  // UPDATE a thought by id 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'Your thought was updated!'});
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE thought and UPDATE user
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json({ message: 'Your thought was deleted!'});
        })
        .catch(err => res.json(err));
  },

  // ADD a reaction to a thought 
  addReaction({ params, body}, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body }},
          { new: true, runValidators: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.json({ message: 'Your reaction was added!'});
      })
      .catch(err => res.json(err))
  },

  // REMOVE ALL reactions from a thought
  removeAllReaction( req, res ) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: { reactions: req.body }},
        { new: true }
    )
    .select('-__v')
      .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No reaction found with that id!' });
            return;
            }
            res.json({ message: 'Your reactions were removed!'});
          })
          .catch(err => res.status(400).json(err));
  },

  // REMOVE ONE reaction from a thought
  removeOneReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
    )
      .select('-__v')
      .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No reaction found with that id!' });
            return;
            }
            res.json({ message: 'Your reaction was removed!'});
          })
          .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;