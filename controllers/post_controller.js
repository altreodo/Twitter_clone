const post=require('../models/post');
const { use } = require('../routes');

const Comment=require('../models/comments');
module.exports.newpost=async function (req,res){
    try{
    let pt=await post.create({
        content:req.body.content,
        user:req.user._id,
    });
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:pt,
            },
            message:"post created"
        });
    }
    req.flash('success','Posted!');
    return res.redirect('back');
}catch(err){
    console.log("err",err);
    return res.redirect('back');
}
}
module.exports.deletepost=async function (req,res) {
    try{
    let id=req.query.id;
    let id2=req.query.id2;
    let gt=await post.findById(id);
         if(req.user.id==gt.user){
    req.flash('error','Post deleted');
             gt.remove();
         await Comment.deleteMany({post:id}); 
         if(req.xhr){
         return res.status(200).json({
             data:{
                 post_id:id
             },
             message:" post deleted"
         });
         }
         return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('err',err);
    }
}