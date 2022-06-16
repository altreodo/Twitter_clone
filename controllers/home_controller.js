const post=require('../models/post');
const userd=require('../models/user');
module.exports.home = async function(req, res){
    try{

        let posts=await post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
            let user=await userd.find({}) ;
            return res.render('home',{
                title: "AlteroChat | Home",
                postlist:posts,
                allusers:user
            });
    }catch(err){
        console.log('err',err);
    }
}

// module.exports.actionName = function(req, res){}