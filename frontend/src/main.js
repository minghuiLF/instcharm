// importing named exports we use brackets
import { createElement, createPostTile, uploadImage } from './helpers.js';

// when importing 'default' exports, use below syntax
import {USER ,POST} from './api.js';
//logout and login handle



var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
const wellcome= document.getElementById('wellcome');
const logout=document.getElementById('logout');
const logoutbut=document.getElementById('logoutbut');
const profilebut=document.getElementById('profilebt');
const addpostbut=document.getElementById('addingpostbt');
const api  = new USER();
if (token) {
  console.log(token)

  wellcome.setAttribute("style","display: none");
  logoutbut.setAttribute("style","display:block");
  profilebut.setAttribute("style","display:block");
  addpostbut.setAttribute("style","display:block");

  const userid = api.getMe().then(res=>{
    if (res.ok) {
      res.json().then(json => {

          document.cookie='uid='+json.id;
          const uid=document.cookie.replace(/(?:(?:^|.*;\s*)uid\s*\=\s*([^;]*).*$)|^.*$/, "$1")
          console.log(uid);

      });;
    }else{
      if (res.status=='403') {

        return;
      }
    }

  });

  const feed = api.getFeed().then(res=>{
    if (res.ok) {
      res.json().then(json => {

          const posts=json.posts;
          const uid=document.cookie.replace(/(?:(?:^|.*;\s*)uid\s*\=\s*([^;]*).*$)|^.*$/, "$1")
          if (posts) {
            posts.reduce((parent, post) => {

              if (post.meta.likes.includes(parseFloat(uid))) {

                parent.appendChild(createPostTile(post,true));

              }else {

                parent.appendChild(createPostTile(post));
              }

              return parent;

            }, document.getElementById('large-feed'))

          }

      });;
    }else{
      if (res.status=='403') {

        return;
      }
    }

  });

}


logout.onclick=function(e){
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = 'http://127.0.0.1:8080/';
}



// we can use this single api request multiple times



window.getdetail=function(postid){
  const base64Flag = 'data:image/png;base64,';
  const img =document.getElementById('detail-img')
  const likelistdiv =document.getElementById('likelist')
  const commentsdiv =document.getElementById('conments')
  const likecount =document.getElementById('liked-count')
  const authordiv =document.getElementById('author')

  while (likelistdiv.firstChild) {
    likelistdiv.removeChild(likelistdiv.firstChild);
  }
  while (commentsdiv.firstChild) {
    commentsdiv.removeChild(commentsdiv.firstChild);
  }


  const api=new POST;

  const req = api.getPost(postid).then(res=>{
    if (res.ok) {
      res.json().then(post => {



          if (post) {
            console.log(post);

            const liked=post.meta.likes ;//Array of liked id
            const comments=post.comments ;//array of comments
            const author=post.meta.author;
            const description=post.meta.description_text;

            img.setAttribute("src",base64Flag+post.src)

            authordiv.textContent=author;

            likecount.textContent=" "+liked.length;
            const user=new USER
            for (var i = 0; i < liked.length; i++) {
              user.getSomeonbyID(liked[i]).then(res=>{ res.json().then(json=>{ likelistdiv.appendChild(createElement('p',json.username))}  )})

            }
            for (var i = 0; i < comments.length; i++) {
              var commentauthor=createElement("b",comments[i].author)
              var comment=document.createTextNode(": "+comments[i].comment)
              var comenthtml=createElement('p',"",{"style":"max-width:200px"})
              comenthtml.appendChild(commentauthor)
              comenthtml.appendChild(comment)
              commentsdiv.appendChild(comenthtml)
            }




            $('#exampleModalCenter').modal()
          }

      });;
    }else{
      if (res.status=='403') {

        return;
      }
    }

  });


}


window.like =function(postid){

  const api=new POST;
  const whichpost=document.getElementById(postid);

  console.log(whichpost.classList);
  if (whichpost.classList.contains("liked")) {
    const res = api.unlikePsot(postid).then(res=>{
      if (res.ok) {
        res.json().then(json => {
            console.log('json');

            whichpost.classList.remove("liked")
            whichpost.getElementsByClassName('likeico')[0].classList.replace('fas','far')

        });;
      }else{
        if (res.status=='403') {

          return;
        }
      }

    });
  }else{
    const res = api.likePsot(postid).then(res=>{
      if (res.ok) {
        res.json().then(json => {
            console.log('json');
            whichpost.classList.add("liked")
            whichpost.getElementsByClassName('likeico')[0].classList.replace('far','fas')

        });;
      }else{
        if (res.status=='403') {

          return;
        }
      }

    });
  }



}





// Potential example to upload an image
// const input = document.querySelector('input[type="file"]');
//
// input.addEventListener('change', uploadImage);
