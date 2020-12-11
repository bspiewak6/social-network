const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts -- /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path:'reactions',
      select: '-__v'
    })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  // get one thought by id -- /api/thoughts/:thoughtId
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            // If no thought is found, send 404
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

  // add thought to user -- /api/thoughts/:userId
  addThought({ params, body }, res) {
    // console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        // console.log(_id);
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update a thought by id -- api/thoughts/:thoughtId
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove thought and also from user -- /api/thoughts/:userId/:thoughtId
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;