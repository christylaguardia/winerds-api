const Router = require('express').Router;
const Users = require('./models/Users');
const Profiles = require('./models/Profiles');
// const Categories = require('./models/Categories');
// const Tastings = require('./models/Tastings');
const router = Router();

router
  .put('/user', (req, res, next) => {
    Users.updateUser(req.body)
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/user', (req, res, next) => {
    Users.findOne({ _id: req.user.uid })
      .select('_id displayName email experience')
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/profiles', (req, res, next) => {
    Profiles.find()
      .select('_id profile')
      .lean()
      .then(profiles => res.send(profiles))
      .catch(next)
  })
  .get('/profiles/:id', (req, res, next) => {
    Profiles.findOne({ _id: req.params.id })
      .select('_id profile sections')
      .lean()
      .then(profile => res.send(profile))
      .catch(next)
  });
  // .get('/category/:id', (req, res, next) => {
  //   Categories.findById(req.params.id)
  //     .then(category => {
  //       if (!category)
  //         throw {
  //           code: 404,
  //           error: `category ${req.params.id} does not exist or is not found`
  //         };
  //       res.send(category);
  //     })
  //     .catch(next);
  // })
  // .post('/category', (req, res, next) => {
  //   new Categories(req.body)
  //     .save()
  //     .then(category => res.send(category))
  //     .catch(next);
  // })
  // .get('/categories', (req, res, next) => {
  //   Categories.find()
  //     .then(categories => res.send(categories))
  //     .catch(next);
  // })
  ;


module.exports = router;