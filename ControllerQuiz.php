<?php
require_once 'ModalQuiz.php';
$array = $_POST['array'];



$question = new QuizModal();

$result = $question->getQuestions();

// var_dump($result);

file_put_contents('quiz.json', json_encode($result));
$arrayCorectAnswer =[];
 if (count($array)>0) {
foreach ($array as $answer) {
    // var_dump($answer);
     $result=$question->checkAnswers($answer['id'],$answer['choisi']);
        // echo count($result)."\n";
       

           if(count($result)>0){
        // array_push($arrayCorectAnswer,$answer["indexRandom"]);
            echo $answer["indexRandom"];
            // var_dump($arrayCorectAnswer);

    // file_put_contents('indexCorrect.json', json_encode($arrayCorectAnswer));

           }
        
}

// for($i=0;$i<count($arrayCorectAnswer);$i++){
//         echo $arrayCorectAnswer[$i];
// }



}
?>