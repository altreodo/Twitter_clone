const express = require('express');
const router = express.Router();

const passport=require('passport');
const postController = require('../controllers/post_controller');

//post data
router.post('/newpost',passport.checkAuthentication,postController.newpost);
router.get('/destroy',passport.checkAuthentication,postController.deletepost);
module.exports=router;