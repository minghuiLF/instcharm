import {LOGIN} from './api.js';

const api  = new LOGIN();

const loginbt= document.getElementById('login');
const signbt= document.getElementById('signup');
const feedback=document.getElementById('feedback');
loginbt.onclick=function (e){
  // e.preventDefault();
  var un=document.getElementById('inputEmail').value;
  var pw=document.getElementById('inputPassword').value;
  feedback.textContent="";
  if (un=="" || pw=="") {
    feedback.textContent="Missing Username or Password!"
    return;
  }
  var loginf=api.makeLOGINRequest(un,pw);


   const token=loginf.then(res => {
     if (res.ok) {


        // return res.json();
        res.json().then(json=>{
          
          document.cookie='token='+json.token;
          console.log(document.cookie);
          window.location.href='http://127.0.0.1:8080/';
        })

        }else{
          if (res.status=='403') {
            feedback.textContent="Invalid Username or Password!"
            return;
          }


        }

    })

  return false

}
signbt.onclick=()=>{
  window.location.href = 'http://127.0.0.1:8080/signup.html';
}
