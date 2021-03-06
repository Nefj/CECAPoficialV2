var express = require('express');
var db = require('../models/db');
var router = express.Router();

router
  .get('/', function (req, res) {
    db.modules.find({}, function (err, modules) {
      if (err) return res.status(400).send(err);

      return res.status(200).send(modules);
    });
  })
  .get('/:id', function (req, res) {
    db.modules.findOne({ _id: req.params.id }, function (err, modulo) {
      if (err) return res.status(400).send(err);
      if (modulo == null) return res.status(404).send();
      return res.status(200).send(modulo);
    });
  })
  .get('/lista/:id', function (req, res) {
    db.modules.find({ programs: req.params.id }, function (err, modules) {
      if (err) return res.status(400).send(err);
      return res.status(200).send(modules);
    });
  })
  .get('/eventoModuls/:id', function (req, res) {
    db.events.findOne({ _id: req.params.id }, function (err, events) {
      if (err) { return res.status(400).send(err); }
      if (events) {
        db.modules.find({ programs: events.programs }, function (err, moduls) {
          if (err) { return res.status(400).send(err); }
          return res.status(200).send(moduls);

        });//F module
      } else return res.status(404).send();
    });//F EVENTS
  })

  .post('/add', function (req, res) {
    var modulo = new db.modules(req.body);
    modulo.save(function (err, modulo) {
      if (err) { return res.status(400).send(err); }
      return res.status(200).send(modulo);
    });
  })
  .post('/modules', function (req, res) {
    db.modules.find({ _id: { $in: req.body } }, { name: 1 }, function (err, moduls) {
      if (err) { return res.status(400).send(err); }
      return res.status(200).send(moduls);

    })
  })
  .put('/:id', function (req, res) {
    db.modules.findOne({ _id: req.params.id }, function (err, modulo) {
      if (err) return res.status(400).send(err);
      if (modulo == null) return res.status(404).send();
      for (i in req.body) {
        modulo[i] = req.body[i];
      }
      modulo.save(function (err, modulo) {
        if (err) return res.status(400).send(err);
        return res.status(200).send(modulo);
      });
    });
  })
  .put('/edit/:id', function (req, res) {
    db.modules.update({ _id: req.params.id },
      {
        $set: {
          'number': req.body.number,
          'name': req.body.name,
          'content': req.body.content
        }
      }).exec(function (err, modulo) {
        if (err) return res.status(400).send(err);
        return res.status(200).send(modulo);
      })
  })
  .delete('/:id', function (req, res) {
    db.modules.remove({ _id: req.params.id }, function (err, modulo) {
      if (err) return res.status(400).send(err);
      return res.status(200).send(modulo);
    });
  });

module.exports = router;