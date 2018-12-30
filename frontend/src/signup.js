import {SIGNUP} from './api.js';

const api  = new SIGNUP();
const loginbt= document.getElementById('login');
const singupbt= document.getElementById('signup');
const feedback=document.getElementById('feedback');
singupbt.onclick=function (e){
  // e.preventDefault();
  var un=document.getElementById('inputUsername').value;
  var pw=document.getElementById('inputPassword').value;
  var em=document.getElementById('inputEmail').value;
  var nm=document.getElementById('inputName').value;
  feedback.textContent="";
  if (un=="" || pw==""||em=="" ||nm=="") {
    feedback.textContent="Non of the feild can be empty!"
    return;
  }
  var loginf=api.makeSIGNUPRequest(un,pw,em,nm);


   const token=loginf.then(res => {
     if (res.ok) {
       res.json().then(json=>{
         
         document.cookie='token='+json.token;
         console.log(document.cookie);
         window.location.href='http://127.0.0.1:8080/';
       })
        }else{
          if (res.status=='409') {
            feedback.textContent="Username Already Taken!"
            return;
          }


        }

    })
    token.then(

    )
    return false

}
loginbt.onclick=()=>{
  window.location.href = 'http://127.0.0.1:8080/login.html';
}
