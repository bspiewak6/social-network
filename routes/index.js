const router = require('express').Router();
// Import all of the API routes from /api/index
const apiRoutes = require('./api/index');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h2> 404 Error!</h2>');
});

module.exports = router;