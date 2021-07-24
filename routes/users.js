const express = require('express');
const router =  express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller.js');

router.get('/profile',passport.checkAuthentication,usersController.profile); //If profile needs to be implemented

router.get('/signup_as_doc',usersController.signup_as_doc);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);

router.get('/mental_illness',usersController.mental_illness);

router.get('/physical_illness',usersController.physical_illness);

router.get('/Find_a_MentalDoc',usersController.Find_a_MentalDoc);

router.get('/Find_a_Doc',usersController.FindaDoc);

router.post('/create_doc',usersController.create_doc);

router.get('/VideoHelp',usersController.VideoHelp);

router.get('/MentalChatRoom',usersController.MentalChatRoom);     

router.get('/ChatRoomPublic',usersController.ChatRoomPublic);

router.post('/chat',usersController.chat);

router.get('/home',usersController.home);

router.post('/create',usersController.create);
// user passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),usersController.createSession); 

router.get('/signout',usersController.destroySession);
module.exports = router;
