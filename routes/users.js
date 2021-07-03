const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/User');


// Sign In
router.post('/', async (req, res) => {
    //console.log(req.body);
    const {email, password} = req.body
    const users = await User.find({"email": email})
    if(users.length===0){
      res.status(400).json('error logging in')
      return
    }
    if(email === users[0].email){
        bcrypt.compare(password, users[0].password, function(err, result) { // Edit this line
            if(result){
                res.json(
                    {
                        login: true,
                        user: users[0]
                    }
                );
            }
            else{
                res.status(400).json('error logging in');
            }
        });     
    }
    else{
        res.status(400).json('error logging in');
    }
})

// Sign Up
router.post('/signUp', async (req, res) => {
    const {email, password, userName} = req.body
    console.log(email + " " + password + " " + userName);
    const users = await User.find({"email": email})
    console.log(users.length)
    if(users.length>0){
      res.json({ registered: false })
    }
    else{
      bcrypt.hash(password, 10, function(err, hashedPassword) { // Hash password
        console.log(password + " " + hashedPassword)
        const user = new User({
          email: email,
          password: hashedPassword,
          userName: userName,
          events: [],
          meetings: [],
          projects: [],
          toDos: []
        
        })
        try{
          const newUser = user.save()
          res.json({registered: true})
        }
        catch(err){
          res.json({ registered: false });
        }
      })
    }
    
})



// Add new ToDo
router.post('/toDos', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    user.toDos.push(task);
    await user.save();
    res.json({added: true})
  }
  catch(err){
    res.json({added: false})
  }
})

// Edit a ToDo
router.patch('/toDos', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.toDos
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === task.key) { 
        taskArray[i].name = task.name
        taskArray[i].date = task.date
        taskArray[i].time = task.time
        taskArray[i].finished = task.finished 
      }
    }
    await user.save();
    res.json({edited: true})
  }
  catch(err){
    res.json({edited: false})
  }
})

// Delete a ToDo
router.delete('/toDos', async (req, res) => {
  const {userID, key} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.toDos
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === key) { 
        taskArray.splice(i, 1); 
      }
  }
    await user.save();
    res.json({deleted: true})
  }
  catch(err){
    res.json({deleted: false})
  }
})

// Add new Event
router.post('/events', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    user.events.push(task);
    await user.save();
    res.json({added: true})
  }
  catch(err){
    res.json({added: false})
  }
})

// Edit an Event
router.patch('/events', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.events
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === task.key) { 
        taskArray[i].name = task.name
        taskArray[i].date = task.date
        taskArray[i].time = task.time
        taskArray[i].finished = task.finished 
      }
    }
    await user.save();
    res.json({edited: true})
  }
  catch(err){
    res.json({edited: false})
  }
})

// Delete an Event
router.delete('/events', async (req, res) => {
  const {userID, key} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.events
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === key) { 
        taskArray.splice(i, 1); 
      }
  }
    await user.save();
    res.json({deleted: true})
  }
  catch(err){
    res.json({deleted: false})
  }
})

// Add new Project
router.post('/projects', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    user.projects.push(task);
    await user.save();
    res.json({added: true})
  }
  catch(err){
    res.json({added: false})
  }
})

// Edit a Project
router.patch('/projects', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.projects
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === task.key) { 
        taskArray[i].name = task.name
        taskArray[i].date = task.date
        taskArray[i].time = task.time
        taskArray[i].finished = task.finished 
      }
    }
    await user.save();
    res.json({edited: true})
  }
  catch(err){
    res.json({edited: false})
  }
})

// Delete a Project
router.delete('/projects', async (req, res) => {
  const {userID, key} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.projects
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === key) { 
        taskArray.splice(i, 1); 
      }
  }
    await user.save();
    res.json({deleted: true})
  }
  catch(err){
    res.json({deleted: false})
  }
})

// Add new Meeting
router.post('/meetings', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    user.meetings.push(task);
    await user.save();
    res.json({added: true})
  }
  catch(err){
    res.json({added: false})
  }
})

// Edit a Meeting
router.patch('/meetings', async (req, res) => {
  const {userID, task} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.meetings
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === task.key) { 
        taskArray[i].name = task.name
        taskArray[i].date = task.date
        taskArray[i].time = task.time
        taskArray[i].finished = task.finished 
      }
    }
    await user.save();
    res.json({edited: true})
  }
  catch(err){
    res.json({edited: false})
  }
})

// Delete a Meeting
router.delete('/meetings', async (req, res) => {
  const {userID, key} = req.body
  try{
    let user = await User.findById(userID);
    let taskArray = user.meetings
    for( var i = 0; i < taskArray.length; i++){ 
      if ( taskArray[i].key === key) { 
        taskArray.splice(i, 1); 
      }
  }
    await user.save();
    res.json({deleted: true})
  }
  catch(err){
    res.json({deleted: false})
  }
})


module.exports = router

