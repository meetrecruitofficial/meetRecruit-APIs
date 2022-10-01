const express = require('express');
const router= express.Router();
const path = require ('path');
const User = require ('../../models/userModel');

const {
    register,
    login,
    getUsersCount,
    getUsers
} = require ('../../controllers/userController');
const { get } = require('..');

//@desc: to register users 
// /api/register
router.post('/register',register);

//@desc: to get all users
// /api/users-count
router.get('/users-count',getUsersCount);


//@desc: dynamic route
// /api/:search
router.get('/sex/:sex', async (req, res)=>{
    const sex = req.params.sex
    const count = await User.findOne({sex: sex}).count();
    return res.status(400).json({result:count});

});

//@desc: dynamic route
// /api/:search
router.get('/state/:state', async (req, res)=>{
    const state = req.params.state
    const count = await User.findOne({state: state}).count();
    return res.status(400).json({result:count});

});

//@desc: dynamic route
// /api/:search
router.get('/country/:country', async (req, res)=>{
    const country= req.params.country
    const count = await User.findOne({country: country}).count();
    return res.status(400).json({result:count});

});

router.get('/all-user',getUsers);


module.exports = router

