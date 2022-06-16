const express = require('express');
const router = express.Router();
const passport=require('passport');
const commentController = require('../controllers/comment_controller');

router.post('/newcomment',passport.checkAuthentication,commentController.newcomment);
router.get('/destroy',passport.checkAuthentication,commentController.deletecomment);
module.exports=router;