const router = require('express').Router();
const peopleCtrl = require('../controllers/people');

// GET /students
router.get('/people', peopleCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/mood', peopleCtrl.addMood);

// DELETE /facts/:id
router.delete('/mood/:id', peopleCtrl.delMood);

module.exports = router;