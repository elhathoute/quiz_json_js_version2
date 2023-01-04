$(document).ready(function () {
  $.get('ControllerQuiz.php', function(data) {
    $.get('ModalQuiz.php', function(data) {

      });
  });

 

fetch('quiz.json')
  .then(response => response.json())
  .then(array => {

     var questions=array;
    console.log(questions);
//random array
function randomOfArray(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));//tjr < i+1
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }

   return array;
}

//current index 
let currentIndex=0;
//lenght of table
let questionCount=questions.length;

let infos =document.getElementById('info-list');
let info_title=document.getElementById('info-title');
let quiz =document.getElementById('quiz_box');
let information =document.getElementById('information');
let quizBar=document.getElementById('quiz');
let resultat=document.getElementById('resultat');
let title=document.getElementById('title');
quiz.style.display = "none";
let next =document.getElementById('next');
let replay =document.getElementById('replay');
let submit =document.getElementById('submit');
let retour =document.getElementById('retour');
let time_count=document.getElementById('time-counter');


let answers=document.getElementById('answers-box');

let user_input=document.getElementById("user-input");







let countDownTimeInterval;//pour stop countdown


replay.style.display="none";

submit.style.display="none";

retour.style.display="none";

time_count.style.display="none";
//btn to replay the quizz
replay.addEventListener('click',function(){
  window.location.reload();

});

// accept bnt disabled au depart
next.style.display='none';
//nom de l'utilisateur
user_input.addEventListener("keyup",function(){
  if(this.value==''){
    next.style.display='none';
    }else{
      //show bnt of accept
      next.style.display='block';
    }
})

//generat an array random between 0 and lengh of question 
random= randomOfArray(questions);

submit.style.display="none";
//btn of accept
next.addEventListener('click',function(){
 

  //time count down
  countDownTime(10,questionCount);
  //create a div to store name of user
  const divUser = document.createElement("div");
  user_input.replaceWith(divUser);
  let nomUser=user_input.value;
  nomUser.className="nom_user";
  divUser.innerHTML="<h3>😎 Welcome  😎  : <span id='nom-user'>"+nomUser +" </span></h3>";
  //remove btn of  accept and show submit btn
   removeBtnNext();
   //disabled condition of quizz
    infos.style.display = "none";
    //show quizz
    quiz.style.display = "inline";
    information.classList.remove('active');
    //add class to stepper bar
    quizBar.classList.add('active');
    //remove title
    info_title.remove();
    //la question de chaque l'element
    arrRandom= random[currentIndex].question;
    //tout les attribut de l'element (options+explications+correct answer)
    touslesAttribut=random[currentIndex];
    //appeler la fnct pour add questions
    ajouterQuestion(touslesAttribut,arrRandom,questionCount);

    

  let lesReponse=document.querySelectorAll("input[type=radio]");
  // console.log(lesReponse);
  lenghtQuestion=lesReponse.length;
for(i=0;i<lenghtQuestion;i++){
  
  lesReponse[i].addEventListener('change',function(){
    if(this.checked){
      submit.style.display="block";
    }else{
      submit.style.display="none";
    }
  });
}
  
  });
 
  var arrayCorrectQuest=[];

  //btn of submit
  submit.onclick=function(){
   // Use clearInterval() to stop time
  clearInterval(countDownTimeInterval);
  //add coun down of 30 seconds
  countDownTime(10,questionCount);
 
     //get the right answer
     let reponsrvraix=questions[currentIndex].vrai;

     indexDb=questions[currentIndex].id_reponse;
     console.log(indexDb);
     //incrementer l'indice 
      currentIndex++;
      //comparer right answer with answer of user
     compareReponse(reponsrvraix,indexDb);

       //remove old question and answers
       title.innerHTML='';
       answers.innerHTML='';
      

      if(currentIndex==questionCount){
        quizBar.classList.remove('active');
        resultat.classList.add('active');
      
          // Use clearInterval() to stop time
        clearInterval(countDownTimeInterval);
         time_count.remove();
         replay.style.display="block";
         this.remove();

         //show result of user
         $.ajax({
          url: 'ControllerQuiz.php',
          type: 'POST',
          data: { array: arrayToSentInDb },
          success: function(response) {
            for(i=0;i<response.length;i++){
              arrayCorrectQuest.push(response[i]);

            }
            // arrayCorrectQuest.push(response);
            arrayCorrectQuest.splice(0,2);
             console.log(arrayCorrectQuest.length);
             console.log(arrayCorrectQuest);
             afficherResultat(questionCount,arrayCorrectQuest);
          }
        });
       
      } 
      
     else{
      // console.log(currentIndex)
      arrRandom= random[currentIndex].question;
      touslesAttribut=random[currentIndex];
     ajouterQuestion(touslesAttribut,arrRandom,questionCount);
     } 

     //if user no chosen any option and time>0
     let lesReponse=document.querySelectorAll("input[type=radio]");
    //  console.log(lesReponse);
     lenghtQuestion=lesReponse.length;
   for(i=0;i<lenghtQuestion;i++){
     
     lesReponse[i].addEventListener('change',function(){
       if(this.checked){
         submit.style.display="block";
       }else{
         submit.style.display="none";
       }
     });
   }
 
    

  };
 //function to add quizz

function ajouterQuestion(tquest,quest,count){
  submit.style.display="none";
// console.log(tquest);
// console.log(quest);
 if(currentIndex<count){
    //crer le titre de question
    let questionTitre=document.createElement("h2");
    //crer le text de question
    let questionText=document.createTextNode(quest);
    //append child to questionTitre
    questionTitre.appendChild(questionText);
    //afficher titre de question
    title.appendChild(questionTitre);
   
    //answers
    for(let i=0 ;i<4;i++){
      //create div for answers
      let answerDiv=document.createElement("div");
      //add class to this div
      answerDiv.className='answers';
      // creat RadioNodeList
      let radio=document.createElement("input");
      //add type+name+id+data-attribute
      radio.name='question';
      radio.className='choise-question';
      radio.type='radio';
      radio.id=`option_${i}`;
      radio.value=tquest[`id_${i}`];
    
      radio.dataset.option =tquest[`option_${i}`];
      //create label
    
      let label=document.createElement('label');
      //add for attribute
      label.htmlFor=`option_${i}`;
      label.setAttribute("id",`option_${i}`);
      //create label text
      let labelText=document.createTextNode(tquest[`option_${i}`]);
      //
      label.appendChild(labelText);
    
      answerDiv.appendChild(radio);
      answerDiv.appendChild(label);
    
    
      answers.appendChild(answerDiv);
   
      
    }
    //avancement de quiz 
    let numOfQuestion=document.createElement("div");
    numOfQuestion.className="num-question";
    answers.appendChild(numOfQuestion);
    numOfQuestion.innerHTML=(currentIndex+1)+'/'+questionCount;
 }

}
var arrayToSentInDb=[];

var arrayQuestFalse=[];




function compareReponse(answer,index){//current index
  // console.log(answer);
  // console.log(index);

  let lesReponse=document.getElementsByName("question");
  for(let i=0;i<lesReponse.length;i++){
  if(lesReponse[i].checked){
        ReponseChoisi=lesReponse[i].value;

        console.log('ha xno khtar =>' +ReponseChoisi);
        console.log('ha s7i7 =>' +answer);

        arrayToSentInDb.push({'id_rep_choisi':ReponseChoisi,'indexRandom':currentIndex-1});
      
        // for(i=0;i<random.length;i++){
        //   console.log(random[i]);
        // }
       
        // console.log(arrayToSentInDb);

        // if(answer==ReponseChoisi){
        //   // arrayCorrectQuest.push(currentIndex-1);   
        //   // console.log(arrayCorrectQuest);
        // }
        // else{
        //   console.log('nonegaux'); 
        //   console.log(arrayToSentInDb);
        // }
  }else{
    arrayToSentInDb.push({'id_rep_choisi':0,'indexRandom':currentIndex-1});

  }
  

  }

}

function afficherResultat(count,array){
  console.log('array');
  console.log(array);

  if(currentIndex===count){
    
     title.remove();
     info_title.remove();     //
     let nomUser=user_input.value;
     if ((arrayCorrectQuest.length)==count){ 

      
      answers.innerHTML = '<span id="nom-user">'+nomUser +'</span> congratulation! 🎉, You got  '+ (arrayCorrectQuest.length) +'</p> out of <p>'+ count +'</p></span>';

  }
  else if((arrayCorrectQuest.length) >=(count/2) ){
    answers.innerHTML= '<span id="nom-user">'+nomUser +'</span>   nice 😎, You got  '+ (arrayCorrectQuest.length) +' out of '+ count +'</span>';
      
  }
  else { 
    answers.innerHTML= '<span id="nom-user">'+nomUser +'</span>  sorry 😐, You got only  '+ (arrayCorrectQuest.length) +' out of '+ count +'</span>';
      
  }
   
if(arrayCorrectQuest.length>0){
  answers.innerHTML+="<br>";
  answers.innerHTML+='<br> <h3>Votre Explication est: </h3> <br>';
  for(i=0;i<arrayCorrectQuest.length;i++){
   
    answers.innerHTML+="<br>";
    answers.innerHTML+= "<p calss='explication' style='background-color:#80FF95;border-radius:7px;padding:20px;margin:0px 12px;' >explication N° :"+(i+1)+"<br>"+random[arrayCorrectQuest[i]].explication+"</p>";
  
  }

}
    
   
    // submit.style.display="none";
    // retour.style.display="none";
    quizBar.classList.remove('active');
    resultat.classList.add('active');
    replay.style.display="block";
    replay.addEventListener('click',function(){
     
      window.location.reload();
    });
    
  }

  
}

function removeBtnNext(){
  next.style.display="none";
  time_count.style.display="block";
  // submit.style.display="block";
 

}

function countDownTime(time,count){

  if(currentIndex<count){
  countDownTimeInterval=setInterval(function(){
     time_count.innerHTML=time +' seconds';
 
    if(--time<0){
      clearInterval(countDownTimeInterval);
      submit.click();
     
    
    }
       
  },1000);
  }
 
}


}
    
);

})