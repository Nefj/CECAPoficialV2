var express = require('express');
var db = require('../models/db');
var router = express.Router();
var mongoose = require('mongoose');
////////////////////////////////
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// var multer = require('multer');
// var xlstojson = require("xls-to-json-lc");
// var xlsxtojson = require("xlsx-to-json-lc");

// var storage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalFilename.split('.')[file.originalFilename.split('.').length -1])
//     }
// });
// var upload = multer({ //multer settings
//                 storage: storage,
//                 fileFilter : function(req, file, callback) { //file filter
//                     if (['xls', 'xlsx'].indexOf(file.originalFilename.split('.')[file.originalFilename.split('.').length-1]) === -1) {
//                         return callback(new Error('Wrong extension type'));
//                     }
//                     callback(null, true);
//                 }
//             }).single('file');

///////////other//////////

var XLSX = require('xlsx')

///////////////////////////

router
  .get('/', function (req, res) {
    db.persons.find({}, function (err, persons) {
      if (err) return res.status(400).send(err);

      return res.status(200).send(persons);
    });
  })

  .get('/:id', function (req, res) {
    db.persons.findOne({ _id: req.params.id }, function (err, person) {
      if (err) return res.status(400).send(err);
      if (person == null) return res.status(404).send();

      return res.status(200).send(person);
    });
  })
  .get('/programs/:id', function (req, res) {
    db.persons.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup:
          {
            from: "programs",
            localField: "profile.programs",    // field in the orders collection
            foreignField: "_id",  // field in the items collection
            as: "programDetails"
          }
      }
    ]).exec(function (err, person) {
      if (err) return res.status(404).send(err)
      return res.status(200).send(person[0]);
    });
  })
  /////////////////////////////////////////////////////////////////7
  .get('/inscriptionPerson/:id', function(req, res){
    var arrayIds = req.params.id.split('-');
      this.personId = arrayIds[0];
      this.eventId = arrayIds[1];
      console.log(this.eventId);
      console.log(this.personId);
      db.events.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(eventId) } },
        { $project: { inscriptions: 1 } },
        { $unwind: '$inscriptions' },
        { $match: { 'inscriptions.persons': { $eq: mongoose.Types.ObjectId(personId) } } },
        //{ $group: { _id: { persons: '$inscriptions.persons' }, total: { $sum: 1 } } }
      ], function (err, events) {
        if (err) return res.status(400).send(err);
        console.log(events);
        console.log('aqui el inscription de persona');
        return res.status(200).send(events);
        // for(var i =0 ; i<=events.length-1; i++){
        //   if(events[i].persons == personId){
        //     return res.status(200).send(events[i]);
        //     console.log(events[i]);
        //     i = events.length+1;
        //   }
        // }
      });
  })
  .post('/controlPago',function(req, res){
    console.log(req.body.moduleId);
    var pago = req.body.inscription.canceled_price;

    db.events.update({ _id: req.body.eventId, 'inscriptions.persons': req.body.persona._id },
    {
      $set: { 'inscriptions.$.canceled_price': pago }
     }).exec(function (err, event) {
      if (err) return res.status(400).send(err);
      console.log(event);
      return res.status(200).send(event);
    });                     
  })
  ////////////////////////////////////////////////////
  .post('/descriptionProfile/:id', function (req, res) {
    db.persons.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $project: { profile: 1 } },
      { $unwind: '$profile' },
      { $match: { 'profile._id': mongoose.Types.ObjectId(req.body.profileId) } },
      {
        $lookup: {
          from: "modulars",
          let: { person_id: "$_id", person_profile: "$profile._id" },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$persons", "$$person_id"] },
                  { $gte: ["$profile", "$$person_profile"] }]
              }
            }
          }],
          as: "modulars"
        }
      }
    ]).exec(function (err, person) {
      if (err) return res.status(404).send(err);
      console.log(person[0])
      return res.status(200).send(person[0]);
    })
  })
  ///////////////////////////////////
  // .get('/:id', function (req, res) {
  //   db.events.findOne({ _id: req.params.id }, function (err, event) {
  //     if (err) return res.status(400).send(err);
  //     if (event == null) return res.status(404).send();
  //     // return res.status(200).send(event);
  //     getProgram(event);
  //   });
  //   function getProgram(event) {
  //     db.programs.findOne({ _id: event.programs }, { name: 1 }, function (err, program) {
  //       if (err) return res.status(400).send(err);
  //       console.log(program)
  //       event.name = program.name;
  //       // return res.status(200).send(event);
  //       var persons = event.inscriptions.map(i => i.person);
  //       getPerson(persons, event);
  //     });
  //   }
  //   function getPerson(persons, event) {
  //     db.persons.find({ _id: { $in: persons } }, function (err, persons) {
  //       if (err) return res.status(400).send(err);
  //       // console.log(persons)
  //       event.inscriptions.forEach(i => {
  //         persons.forEach(person => {
  //           if (JSON.stringify(i.person) == JSON.stringify(person._id)) {
  //             i.persons = person.first_name + ' ' + person.last_name;
  //           }
  //         });
  //       });
  //       // console.log(event);
  //       return res.status(200).send(event);
  //     });
  //   }

  // })
  .get('/listPersons/:id', function (req, res) {
    db.events.findOne({ _id: req.params.id }, { inscriptions: 1 }, function (err, event) {
      if (err) return res.status(400).send(err);
      if (event == null) return res.status(404).send();
      if (event.inscriptions.length > 0) return res.status(404).send();
      var persons = event.inscriptions.map((p) => p.person)
      Persons(persons);
      // return res.status(200).send(event);
    })
    function Persons(p) {
      db.persons.find({ _id: { $in: p } }, function (err, persons) {
        if (err) return res.status(400).send(err);

        return res.status(200).send(persons);
      })
    }
  })

  .post('/', function (req, res, next) {
    db.persons.findOne({ ci: req.body.persona.ci }, function (err, ciExist) {
      if (err) return res.status(400).send(err);
      if (ciExist == null) { req.body.found = false; validCell(); }
      else { req.body.found = true; req.body.persona = ciExist; next(); }
    })
    function validCell() {
      db.persons.findOne({ cellphone: req.body.persona.cellphone }, function (err, celExist) {
        if (err) return res.status(400).send(err);
        if (celExist == null) { req.body.found = false; next(); }
        else { req.body.found = true; req.body.persona = celExist; next(); }
      })
    }
  })
  .post('/', function (req, res) {
    if (req.body.found) return res.status(404).send('Persona Existente');
    var person = new db.persons(req.body.persona);
    person.save(function (err, person) {
      if (err) { return res.status(400).send(err); }
      return res.status(200).send(person);
      // addInscription(person, req.body.inscription, req.body.eventId);
    });
  })
  ///////////////////////////////////////////////////////////////////////////////////////////////// 
  .get('/existCi/:id', function (req, res) {
    db.persons.findOne({ ci: req.params.id }, { first_name: 1, last_name: 1 }, function (err, user) {
      if (err) return console.log(err);
      if (user == null) return res.sendStatus(404);
      return res.status(200).send(user);
    });
  })
  ////////////////////////////////////////////////////////////////////////////
  .post('/profile/:id', function (req, res) {
    db.persons.findOne({ _id: req.params.id }, function (err, person) {
      if (err) return res.status(400).send(err);
      if (person == null) return res.status(404).send();
      console.log(person)
      console.log(req.body)
      var idProfile = req.body;
      var profile = person.profile.map((i) => i.person);
      getProfilePerson(profile);
    });
    function getProfilePerson(profile) {
      db.persons.findOne({ _id: profile }, { profile: 1 }, function (err, profile) {
        if (err) return res.status(400).send(err);
        console.log(profile)
        return res.status(200).send(profile);
      })
    }
  })
  //////////////////////////////////////////////////////////////////////////
  .post('/upload', multipartMiddleware, function (req, res) {

    console.log(req.body, req.files);
    console.log(req.files.fileKey.path);
    //   var workbook = XLSX.readFile(req.files.fileKey.path);
    //   var sheet_name_list = workbook.SheetNames;
    //   var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //   console.log(xlData); 

    //   for(let contact of xlData){
    //       let newPerson=new db.persons(req.body);

    //       if(contact.Mobile!=undefined){
    //           newPerson.first_name=contact.Firstname;
    //           if(contact.Lastname!=null){
    //               newPerson.last_name=contact.Lastname;
    //           }else{
    //               newPerson.last_name='';
    //           }
    //           newPerson.ci=0;
    //           newPerson.phone=0;
    //           let numero='s'+contact.Mobile;
    //           if(numero.length==9){
    //               newPerson.cellphone=numero.substring(1,9);
    //           }else{
    //               newPerson.cellphone=numero.substring(6,numero.length);
    //           }
    //           newPerson.whatsapp_group='Importados del celular';
    //           newPerson.city='';
    //           newPerson.email='';
    //           newPerson.ocupation='Particular';
    //           newPerson.descOcupation={carrera:'',
    //                                   universidad:'',
    //                                   semestre:'',
    //                                   areaTrabajo:'Otro',
    //                                   profesion:'',
    //                                   empresa:'',
    //                                   cargo:''};

    //           newPerson.save(function(err,person){
    //               if (err) return res.status(400).send(err);
    //               return res.status(200).send();
    //           })
    //       }
    //   }
  })
  // .post('/', function (req, res) {
  //    var person = new db.persons(req.body.persona);
  //    console.log(req.body);
  //    db.persons.findOne({ ci: req.body.persona.ci, cellphone: req.body.persona.cellphone }, function (err, existeCellphone) {
  //       if (existeCellphone == null) {
  //          console.log('llegue aqui');
  //          //if(person.first_name == '' || person.last_name == '' || person.ci == '' || person.carteras == '') 
  //          //return res.status(400).send(); 
  //          // save person
  //          person.save(function (err, person) {
  //             console.log('persona guardada');
  //             if (err) { return res.status(400).send(err); }
  //             addInscription(person, req.body.inscription, req.body.eventId);
  //          });
  //          function addInscription(person, inscri, idEvent) {
  //             db.events.findOne({ _id: idEvent }, function (err, events) {
  //                console.log(events);
  //                db.modules.find({ programs: events.programs }).count().exec(function (err, moduls) {
  //                   console.log(moduls);
  //                   console.log('llegue al la cantidad de modulos');
  //                   var modulPrice = inscri.price_event / moduls;///////DIVISION
  //                   console.log(modulPrice);
  //                   var inscription = {
  //                      // segun al numero de asistencias sacar el precio total q tiene q pagar
  //                      total_price: 0,//sumatorio por asistencia de cada modulo
  //                      module_price: modulPrice,
  //                      bolivianos_price: inscri.canceled_price,
  //                      dolares_price: 0,
  //                      canceled_price: inscri.canceled_price,
  //                      price_event: inscri.price_event,
  //                      receipt: inscri.receipt,
  //                      name: person.name,
  //                      ci: person.ci,
  //                      cellphone: person.cellphone,
  //                      persons: person._id,
  //                      users: inscri.users
  //                   };
  //                   var d = new Date();
  //                   //////////////////////
  //                   // db.events.update({ _id: idEvent, 'inscriptions.person': req.body.person },
  //                   //       {
  //                   //             $set: { 'inscriptions.$.state': req.body.state, 'inscriptions.$.description': req.body.description }
  //                   //       }).exec(function (err, off) {
  //                   //             if (err) return res.status(400).send(err);
  //                   //             //db.events.find({ _id: req.body.name, _id: { $in: req.body.person } }, function (err, event) {
  //                   //             db.events.find({ _id: req.body.name }, function (err, event) {
  //                   //                   if (err) return res.status(401).send(err);
  //                   //             return res.status(201).send(event);
  //                   //             });
  //                   //             //	if (off.nModified == 0) return res.status(406).send();
  //                   //       });
  //                   db.events.update({ _id: idEvent },
  //                      {
  //                         $push: {
  //                            inscriptions: inscription
  //                         }
  //                      }, {
  //                         multi: true
  //                      }, function (err, events) {
  //                         if (err) return res.status(400).send(err);
  //                         console.log(events);
  //                         // if (events == null) return res.status(404).send();
  //                         return res.status(200).send(person);
  //                      });
  //                });//fin module
  //             });//fin Event
  //          }
  //       } else {
  //          if (err) return res.status(400).send(err);
  //          console.log('La Persona ya existe');
  //       }
  //    });
  //    //       }else{
  //    //             if (err) return res.status(400).send(err);
  //    //             console.log('El numero de CI de la Persona ya existe')
  //    //       }
  //    //    });      
  // })

  .put('/:id', function (req, res) {
    console.log("exito");
    console.log(req.params.id);
    db.persons.findOne({ _id: req.params.id }, function (err, person) {
      if (err) return res.status(400).send(err);
      if (person == null) return res.status(404).send();

      for (i in req.body) {
        person[i] = req.body[i];
      }
      person.save(function (err, person) {
        if (err) return res.status(400).send(err);

        return res.status(200).send(person);
      });
    });
  })
  .put('/ocupation/:id', function (req, res) {
    console.log(req.body);
    db.persons.update({ _id: req.params.id },
      {
        $set: {//Universitario
          'descOcupation.carrera': req.body.carrera,
          'descOcupation.universidad': req.body.universidad,
          'descOcupation.semestre': req.body.semestre,
          //Particular
          'descOcupation.areaTrabajo': req.body.areaTrabajo,
          //Profesional
          'descOcupation.profesion': req.body.profesion,
          'descOcupation.empresa': req.body.empresa,
          'descOcupation.cargo': req.body.cargo,
        }
      }).exec(function (err, off) {
        if (err) return res.status(400).send(err);
      })
    // db.events.update({ _id: req.body.name, 'inscriptions.person': req.body.person },
    //    {
    //       $set: { 'inscriptions.$.state': req.body.state, 'inscriptions.$.description': req.body.description }
    //    }).exec(function (err, off) {
    //       if (err) return res.status(400).send(err);
    //       db.events.find({ _id: req.body.name, _id: { $in: req.body.person } }, function (err, event) {
    //          if (err) return res.status(401).send(err);
    //          return res.status(201).send(event);
    //       });
    //       //	if (off.nModified == 0) return res.status(406).send();
    //    });
  })
  .put('/finalWork/:id', function (req, res) {
    console.log(req.body);
    //   final_work: {
    //     date_start: Date,
    //     name: String, // nombre del trabajo final
    //     origin: String,
    //     facilitator: ObjectId,
    //     revisions: [{
    //        state: Number, // 9 posibles estados
    //        observations: String,
    //        date_review: Date,
    //     }],
    //     date_end: Date,
    //     empastado: Boolean,
    //     copy_1: Boolean,
    //     copy_2: Boolean,
    //     form: Boolean,
    //     certificate: Boolean,
    //     letter_review: Boolean,
    //     company_certificate: Boolean
    //  },
    db.persons.update({ _id: req.params.id, 'profile._id': req.body.profileId },
      {
        $set: {//Universitario
          'profile.$.finalWork': req.body.finalWork,
        }
      }).exec(function (err, off) {
        if (err) return res.status(400).send(err);
      });
  })

  .delete('/:id', function (req, res) {
    db.persons.remove({ _id: req.params.id }, function (err, person) {
      if (err) return res.status(400).send(err);

      return res.status(200).send(person);
    });
  });

module.exports = router;