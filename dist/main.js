let questions =[
  {
    
   question:"1-Why is AWS more economical than traditional data centers for applications with varying compute  workloads?",
      0:"Amazon EC2 costs are billed on a monthly basi",
      1:"Users retain full administrative access to their Amazon EC2 instance",
      2:"Amazon EC2 instances can be launched on demand when needed",
      3:"Users can permanently run enough instances to handle peak workloads.",
      vrai:"Amazon EC2 instances can be launched on demand when needed",
      explication:"Q1:C-The ability to <a href='https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html'> launch instances on demand </a> when needed allows users to launch and terminate instances in response to a varying workload. This is a more economical practice than purchasing enough on-premises servers to handle the peak load."
      
  },{
    question:"2-Which AWS service would simplify the migration of a database to AWS?",
    0:"AWS Storage Gateway",
    1:"AWS Database Migration Service (AWS DMS)",
    2:"Amazon EC2",
    3:"Users can permanently run enough instances to handle peak workloads.",
    vrai:"AWS Database Migration Service (AWS DMS)",
    explication:"Q2:B- AWS DMS helps users migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database.<a href='https://aws.amazon.com/fr/dms/'> AWS DMS</a> can migrate data to and from most widely used commercial and open-source databases."
    
  },{
    question:"3-Which AWS offering enables users to find, buy, and immediately start using software solutions in their AWS environment?",
    0:"AWS Config",
    1:"AWS OpsWorks",
    2:"Amazon  AWS SDK",
    3:"AWS Marketplace",
    vrai:"AWS Marketplace",
    explication:"Q3:D- <a href='https://aws.amazon.com/marketplace/'>AWS Marketplace</a> is a digital catalog with thousands of software listings from independent software vendors that makes it easy to find, test, buy, and deploy software that runs on AWS."
    
  },{
    question:"4-Which AWS networking service enables a company to create a virtual network within AWS?",
    0:"AWS Config",
    1:"Amazon Route 53",
    2:"AWS Direct Connect",
    3:"Amazon Virtual Private Cloud (Amazon VPC)",
    vrai:"Amazon Virtual Private Cloud (Amazon VPC)",
    explication:"Q4:D- <a href='https://aws.amazon.com/vpc/'>Amazon VPC<a> lets users provision a logically isolated section of the AWS Cloud where users can launch AWS resources in a virtual network that they define."
    
  },{
    question:"5-Which of the following is an AWS responsibility under the AWS shared responsibility model?",
    0:"Configuring third-party applications",
    1:"Maintaining physical hardware",
    2:"Securing application access and data",
    3:"Managing guest operating systems",
    vrai:"Maintaining physical hardware",
    explication:"Q5:B- – Maintaining physical hardware is an AWS responsibility under the<a href='https://aws.amazon.com/compliance/shared-responsibility-model/'> AWS shared responsibility model<a> "
    
  },{
    question:"6- Which component of the AWS global infrastructure does Amazon CloudFront use to ensure low-latency delivery?",
    0:"AWS Regions",
    1:"Edge locations",
    2:"Availability Zones",
    3:"Virtual Private Cloud (VPC)",
    vrai:"Edge locations",
    explication:"Q6:B- – To deliver content to users with lower latency<a href='https://aws.amazon.com/cloudfront/'>Amazon CloudFront<a> uses a global network of points of presence (edge locations and regional edge caches) worldwide "
  }
  ,{
    question:"7-  How would a system administrator add an additional layer of login security to a user's AWS Management Console?",
    0:"Use Amazon Cloud Directory",
    1:"Audit AWS Identity and Access Management (IAM) roles",
    2:"Enable multi-factor authentication",
    3:"Enable AWS CloudTrail",
    vrai:"Enable multi-factor authentication",
    explication:"Q7:C- – <a href='https://aws.amazon.com/iam/features/mfa/'>Multi-factor authentication<a>  (MFA) is a simple best practice that adds an extra layer of protection on top of a  username and password. With MFA enabled, when a user signs in to an AWS Management Console, they will be prompted for their username and password (the first factor—what they know), as well as for an authentication code from their MFA device (the second factor—what they have). Taken together, these multiple factors provide  increased security for AWS account settings and resources "
  } ,{
    question:"8-  Which service can identify the user that made the API call when an Amazon EC2 instance is terminated?",
    0:"AWS Trusted Advisor",
    1:"AWS CloudTrail",
    2:"AWS X-Ray",
    3:"AWS Identity and Access Management (AWS IAM)",
    vrai:"AWS CloudTrail",
    explication:"Q8:B- – <a href='https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html'> AWS CloudTrail<a>  helps users enable governance, compliance, and operational and risk auditing of their AWS accounts. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. Events  include actions taken in the AWS Management Console, AWS Command Line Interface (CLI), and AWS SDKs and APIs. "
  } 

];

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
  countDownTime(30,questionCount);
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
  console.log(lesReponse);
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
 
  

  //btn of submit
  submit.onclick=function(){
   // Use clearInterval() to stop time
  clearInterval(countDownTimeInterval);
  //add coun down of 30 seconds
  countDownTime(30,questionCount);
 
     //get the right answer
     let reponsrvraix=questions[currentIndex].vrai;
     //incrementer l'indice 
      currentIndex++;
      //comparer right answer with answer of user
     compareReponse(reponsrvraix,currentIndex-1);

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
         afficherResultat(questionCount);
      } 
      
     else{
      console.log(currentIndex)
      arrRandom= random[currentIndex].question;
      touslesAttribut=random[currentIndex];
     ajouterQuestion(touslesAttribut,arrRandom,questionCount);
     } 

     //if user no chosen any option and time>0
     let lesReponse=document.querySelectorAll("input[type=radio]");
     console.log(lesReponse);
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
    
      radio.dataset.option =tquest[i];
      //create label
    
      let label=document.createElement('label');
      //add for attribute
      label.htmlFor=`option_${i}`;
      label.setAttribute("id",`option_${i}`);
      //create label text
      let labelText=document.createTextNode(tquest[i]);
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

var arrayCorrectQuest=[];

let arrCorrectAnswers=[];
function compareReponse(answer,index){//current index
  console.log(answer);
  console.log(index);

  let lesReponse=document.getElementsByName("question");
  for(let i=0;i<lesReponse.length;i++){
  if(lesReponse[i].checked){
        ReponseChoisi=lesReponse[i].dataset.option;
        console.log('ha xno khtar =>' +ReponseChoisi);
        console.log('ha s7i7 =>' +answer);
        if(answer==ReponseChoisi){
          arrayCorrectQuest.push(index);
          console.log('egaux');
          console.log('array answer correct =>'+arrayCorrectQuest);
         
        }
        else{
          console.log('nonegaux'); 
          console.log('array answer correct =>'+arrayCorrectQuest);
        }
  }
  

  }

}

function afficherResultat(count){

  if(currentIndex===count){
    
     title.remove();
     info_title.remove();     //
     let nomUser=user_input.value;
     if ((arrayCorrectQuest.length)==count){ 

      
      answers.innerHTML = '<span id="nom-user">'+nomUser +'</span> congratulation! 🎉, You got '+ (arrayCorrectQuest.length) +'</p> out of <p>'+ count +'</p></span>';

  }
  else if((arrayCorrectQuest.length) >=(count/2) ){
    answers.innerHTML= '<span id="nom-user">'+nomUser +'</span>   nice 😎, You got '+ (arrayCorrectQuest.length) +' out of '+ count +'</span>';
      
  }
  else { 
    answers.innerHTML= '<span id="nom-user">'+nomUser +'</span>  sorry 😐, You got only '+ (arrayCorrectQuest.length) +' out of '+ count +'</span>';
      
  }
   
if(arrayCorrectQuest.length>0){
  answers.innerHTML+="<br>";
  answers.innerHTML+='<br> <h3>Votre Explication est: </h3> <br>';
  for(i=0;i<arrayCorrectQuest.length;i++){
    console.log(random[arrayCorrectQuest[i]].explication);
    
    answers.innerHTML+="<br>";
    answers.innerHTML+= "<p calss='explication'>explication"+random[arrayCorrectQuest[i]].explication+"</p>";
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