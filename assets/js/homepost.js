{
    let createpost=function() {
      let newPostForm = $('#new-post');
      newPostForm.submit(function (e) {
          e.preventDefault();
      $.ajax({
          type:'post',
          url:'/post/newpost',
          data:newPostForm.serialize(),
          success:function (data) {
            let newpost=newpostDom(data.data.post);
            $('#posthere').prepend(newpost);
            deletePost(' .delete-post-button',newpost);
            console.log(data);
         },error:function (err) {
              console.log('error',err.responseText);
          }
      });
    });
}
let newpostDom=function(post) {
    return $(`<p id="post-${post._id}">${post.content}  
    <a class="delete-post-button" href="/post/destroy/?id=${post._id}"><input type="button" value="delete">  </a>
    <br> posted by ${post.user.name}
    <form action="/comment/newcomment" id="new-comment-${post._id}" method="POST">
    <input type="text" name="comment" placeholder="Type here..." required>
    <input type="hidden" name="post" value="${post._id}">
   <input type="submit" value="Comment">
   </form>
    <p id="comment-container-${post._id}">
    </p>
</p>`)
}

//method to delete post from DOM
let deletePost= function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
                $(`#new-comment-${data.data.post_id}`).remove();
                $(`#comment-container-${data.data.post_id}`).remove();
            },error:function(error){
                console.log(error.responseText)
;            }
        })
    })
}


createpost();
}