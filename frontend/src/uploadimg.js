import {POST} from './api.js';


window.selectImage=function (file){

 if(!file.files || !file.files[0]){
   return;
        }
   var reader = new FileReader();
   reader.onload = function(evt){
   document.getElementById('imagelook').src = evt.target.result;
   document.getElementById('imgfeedback').textContent=""
   var img=evt.target.result;
   // console.log(img);
   // console.log(img.split(",")[0]);

    }
  reader.readAsDataURL(file.files[0]);
}

window.uploadImage=function(){
  const input=document.getElementById('imagelook').src

  const img=input.split(",")[1]
  const des=document.getElementById('imagedes').value
  const feedback=document.getElementById('imgfeedback')
  feedback.textContent="";
  if (des && img) {
    const post =new POST;
    post.uploadPsot(des,img).then(res=>{
      if (res.ok) {
        feedback.classList.replace('text-danger','text-success')
        feedback.textContent="success!"

      }else{
        feedback.classList.replace('text-success','text-danger')
        feedback.textContent="Faild! someError happend!"
      }

    });
  }
  else{
    feedback.classList.replace('text-success','text-danger')
    feedback.textContent="non of the feilds can be empty!"
  }

}
