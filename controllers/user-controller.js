const { User } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path:'friends', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path:'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // CREATE a user 
    // example { "username": "test", "email": "testing@test.com" }
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // UPDATE a user by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json({ message: 'User was updated!'});
          })
          .catch(err => res.status(400).json(err));
    },

    // DELETE a user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json({ message: 'User was deleted!'});
          })
          .catch(err => res.status(400).json(err));
    },

    // ADD a friend to a user 
    addFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId }},
          { new: true, runValidators: true }
      )
        .select('-__v')
        .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
          }
          res.json({ message: 'Your friend was added!'});
      })
      .catch(err => res.json(err))
    },

    // REMOVE a friend from a user
    removeFriend({ params }, res){
      User.findOneAndUpdate(
        { _id: params.userId},
        { $pull: { friends: params.friendId } },
        // { $pull: { friends: { friendId: params.friendId }}},
        { new: true, runValidators: true }
    )
    .select('-__v')
      .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id!.' });
            return;
            }
            res.json({ message: 'Your friend was removed!'});
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;