import {USER} from './api.js';

var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
if (token) {
  const user=new USER
  // const userdiv=$("#profile-user")

  const userdiv=document.getElementById('profile-user')
  const emaildiv=document.getElementById('profile-email')
  // const tlike=document.getElementById('lll')
  const tpost=document.getElementById('ppp')
  const fans=document.getElementById('fff')
  const fowling=document.getElementById('fifi')

  user.getMe().then(res=>{

    if (res.ok) {
      res.json().then(json=>{
          console.log(json)
        userdiv.textContent=json.username
        console.log(json.email)
        emaildiv.textContent=json.email

        tpost.firstChild.nodeValue=json.posts.length+" "
        fans.firstChild.nodeValue=json.followed_num+" "
        fowling.firstChild.nodeValue=json.following.length+" "
      })
    }




  })
}
