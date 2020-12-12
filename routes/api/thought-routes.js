const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);
    
// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById);

// /api/thoughts/<userId>
router
    .route('/:userId')
    .post(addThought)
    .put(updateThought);
    
// api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .delete(removeThought)
    .post(addReaction);

// .post(addReaction)  -- needs to route to /api/thoughts/:thoughtId/reactions

// api/thoughts/<userId>/<thoughtId>/<reactionId>
router  
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

// .delete(removeReaction) -- needs to route to /api/thoughts/:thoughtId/reactions



module.exports = router;
