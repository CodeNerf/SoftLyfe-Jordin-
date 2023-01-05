const People = require('../models/people');

module.exports = {
  index,
  addMood,
  delMood
};

function index(req, res) {
  People.find({}, function(err, people) {
    res.render('people/index', { 
        people, 
        user: req.user
     });
  });
}

function addMood(req, res) {
  
}

function delMood(req, res) {

}
