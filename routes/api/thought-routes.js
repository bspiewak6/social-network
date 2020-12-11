const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought 
} = require('../../controllers/thought-controller');

    // /api/thoughts
    router
    .route('/')
    .get(getAllThoughts)
    
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
    .delete(removeThought);

module.exports = router;
