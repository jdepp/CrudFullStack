// This class is the Controller that handles all the backend calls. The calls go right to these methods.


const express = require('express');                 // Express is middleware that is always used with NodeJs and makes life easy.
var router = express.Router();                      // Express' Router basically tells Node that this class is a controller.
var ObjectId = require('mongoose').Types.ObjectId;  // Not too sure what this does but Mongoose is middleware used to talk to Mongo database.

var { Employee } = require('../models/employee');

/* With all of these backend API methods, "req" and "res" are always in the parameter.
 * "req" is the request sent to that endpoint, the info sent from the frontend is stored in "req.body" (the body is a json)
 * "res" is what you're sending back to the caller (Angular in our case).
 */

// GET all Employees --> localhost:3000/employees
router.get('/', (req, res) => {

  // Gets all employees from database and returns them to the frontend
  Employee.find((err, docs) => {
    if(!err)
      res.send(docs);
    else
      console.log('Error in Retriving Employees: ' + JSON.stringify(err, undefined, 2));
  });
});

// GET Employee by ID --> localhost:3000/employees/*id-number*
router.get('/:id', (req, res) => {
  // Not a valid ID
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ' + req.params.id);

  // Finds the employee with the specified ID in the database and returns it to the frontend
  Employee.findById(req.params.id, (err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
  });
});

// POST create new Employee --> localhost:3000/employees/
router.post('/', (req, res) => {

  // Create the new employee
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });

  // Save that new employee to the database
  emp.save((err, doc) =>{
    if(!err)
      res.send(doc);
    else
      console.log('Error in Employee POST: ' + JSON.stringify(err, undefined, 2));
  });
});

// PUT update Employee --> localhost:3000/employees/*id-number*
router.put('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ' + req.params.id);

  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };

  // Finds the employee with the specified ID in the database and updates it in the database
  Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Employee UPDATE: ' + JSON.stringify(err, undefined, 2));
  });
});

// DELETE employee --> localhost:3000/employees/*id-number*
router.delete('/:id', (req, res) => {

  // Checks if the there is even an employee in the database with the specified ID
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ' + req.params.id);

  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Employee DELETE: ' + JSON.stringify(err, undefined, 2));
  });
});

// Basically just tells the Nodejs framework that this class is a thing
module.exports = router;
