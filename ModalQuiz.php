<?php
require_once 'db.php';
// include_once '../classes/gares.class.php';

    class QuizModal extends DbQuiz {
       
     
        public function getQuestions(){
        $sql = "
        
        select DISTINCT  q.question as question,
        (select a.nom_answer from answers as a where a.order like 1 AND a.question_id like q.id ) as option_0,
         (select a.nom_answer from answers as a where a.order like 2 AND a.question_id like q.id ) as option_1,         (select a.nom_answer from answers as a where a.order like 3 AND a.question_id like q.id ) as option_2,         (select a.nom_answer from answers as a where a.order like 4 AND a.question_id like q.id ) as option_3,
             (select a.explication from answers as a where a.etat=1 AND a.question_id like q.id ) as explication,
              (select a.id from answers as a where a.order like 1 AND a.question_id like q.id ) as id_0,
         (select a.id from answers as a where a.order like 2 AND a.question_id like q.id ) as id_1,         (select a.id from answers as a where a.order like 3 AND a.question_id like q.id ) as id_2,         (select a.id from answers as a where a.order like 4 AND a.question_id like q.id ) as id_3
         from answers as a, questions q
        where q.id  = a.question_id 
        ";
        $stm = $this->connexion()->query($sql);
        $result = $stm->fetchAll();
        return $result;

        }
        public function checkAnswers($idchoisi){
            $sql = "SELECT id from answers where id=$idchoisi and etat=1";
            $stm = $this->connexion()->query($sql);
            $result = $stm->fetchAll();
            return $result;
        // echo $id;
        // echo $choisi;
        }
    }

    ?>

