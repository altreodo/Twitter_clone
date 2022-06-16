const comment=require('../models/comments');
const post=require('../models/post');
const { use } = require('../routes');

module.exports.newcomment=function(req,res){
    post.findById(req.body.post,function (err,post) {
        if(post){
            req.flash('success','Comment created');
            comment.create({
                content:req.body.comment,
                post:req.body.post,
                user:req.user._id
            },function (err,comment) {
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}
module.exports.deletecomment=function (req,res) {
    //  console.log(1);
      console.log(req.query.id);
    let id=req.query.id;
    comment.findById(id,function(err,gt){
    if(req.user.id==gt.user){
        req.flash('error','Comment deleted');
        let postid=gt.post;
         console.log(gt.post);
         comment.findByIdAndDelete(id,function(err){
            if(err){return;};
             post.findByIdAndUpdate(postid,{$pull:{comments:id}},function (err,post) {
                return res.redirect('back');
             })
         });
    }else{
     return res.redirect('back');
    }
})}