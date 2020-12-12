const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

// GET all users and POST to create users at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// GET one by id, PUT to update user, and DELETE user at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// POST to add a friend and DELETE a friend at /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId') 
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;