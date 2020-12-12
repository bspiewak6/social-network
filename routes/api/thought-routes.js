const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought,
    addReaction,
    removeAllReaction,
    removeOneReaction
} = require('../../controllers/thought-controller');

// GET all thoughts and POST to create users/api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);
    
// api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
    
// api/thoughts/:thoughtId/reactions
router  
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeAllReaction);

// api/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeOneReaction);

module.exports = router;


