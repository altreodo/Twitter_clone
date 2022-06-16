const User = require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile = function(req, res){
    if(req.params.id){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profileuser:user
        })
    })
}else{
    return res.render('user_profile', {
        title: 'User Profile',
        profileuser:req.body
    })
}
}
module.exports.update=async function (req,res) {
    // if(req.params.id==req.user.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function (err,user) {
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.redirect('back');
    // }
    if(req.params.id==req.user.id){
try{
    let user=await User.findById(req.params.id);
    User.uploadAvatar(req,res,function(err){
  if(err){
      console.log("*****err :",err );
  }
 user.name=req.body.name;
 user.email=req.body.email;
 if(req.file){
    if(user.avatar){
    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
    }
     user.avatar=User.avartarpath + '/' + req.file.filename;
 }
 user.save();
 return res.redirect('back');
    });

}catch(err){

}
    }else{
        return res.redirect('back');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "AlteroChat | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "AlteroChat | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
   req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}