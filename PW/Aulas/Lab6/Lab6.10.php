<?php
    function coinToss(){
        $toss = rand(0,1);
        if($toss == 0){
            return "Cara";
        }else{
            return "Coroa";
        }
    }

    echo "Lançou a moeda ao ar o resultado é: ", coinToss();