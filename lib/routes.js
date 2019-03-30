const Router = require('express').Router;
const router = Router();
// models are singular, mongoose converts to plural
const Category = require('./models/Category');
const Tasting = require('./models/Tasting');
const Template = require('./models/Template');
const User = require('./models/User');
const Winery = require('./models/Winery');

router
  .get('/templates', (req, res, next) => {
    Template.find()
      .select('_id name description sections')
      .lean()
      .then(templates => res.send(templates))
      .catch(next);
  })
  .get('/templates/:id', (req, res, next) => {
    Template.findOne({ _id: req.params.id })
      .select('_id name description sections')
      .lean()
      .then(profile => res.send(profile))
      .catch(next);
  })
  .post('/template', (req, res, next) => {
    new Template(req.body)
      .save()
      .then(template => res.send(template))
      .catch(next);
  })
  .get('/user', (req, res, next) => {
    User.findOne({ _id: req.user.uid })
      .select('_id displayName email experience')
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })
  .put('/user', (req, res, next) => {
    User.updateUser(req.body)
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/tasting', (req, res, next) => {
    Tasting.find({ userId: req.user.uid })
      .select('_id userId profileId type winery vintage style name location descriptors notes')
      .lean()
      .then(tastings => res.send(tastings))
      .catch(next);
  })
  .put('/tasting', (req, res, next) => {
      Tasting.updateTasting(req)
      .then(tasting => res.send(tasting))
      .catch(next);
  })
  .get('/wineries', (req, res, next) => {
    Winery.find()
      .select('_id name address url wines')
      .lean()
      .then(wineries => res.send(wineries))
      .catch(next)
  })
  .put('/wineries', (req, res, next) => {
    Winery.updateWinery(req)
      .then(winery => res.send(winery))
      .catch(next)  
  })
  .get('/categories', (req, res, next) => {
    Category.find()
      .select('_id name tags')
      .lean()
      .then(categories => res.send(categories))
      .catch(next);
  })
  .get('/categories/:name', (req, res, next) => {
    Category.find({ name: req.params.name})
      .select('_id name tags')
      .lean()
      .then(categories => res.send(categories))
      .catch(next);
  });

module.exports = router;