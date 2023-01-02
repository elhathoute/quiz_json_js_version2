<?php
require_once 'ModalQuiz.php';
$array = $_POST['array'];



$question = new QuizModal();

$result = $question->getQuestions();

// var_dump($result);

file_put_contents('quiz.json', json_encode($result));


foreach ($array as $answer) {
    var_dump($answer);
}

?>