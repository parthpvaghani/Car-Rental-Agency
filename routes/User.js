const express = require('express');
const router = express.Router();


const UserController = require('../controllers/UserController');

//It gives current users 
router.get('/users', UserController.getUsers);

//additon of user (new data through req.body) in user collection
router.post('/add_user', UserController.addUser);

//Edit user info based on provided userid 
//newly created data it is taking through the req.body
router.put('/edit_user/:userid', UserController.updateUserInfo);

//remove user based on given userid form user collection
router.delete('/delete_user/:userid', UserController.deleteUser);


module.exports = router;
