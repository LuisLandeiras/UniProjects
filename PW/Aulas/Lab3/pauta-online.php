<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h2>Pauta dos Alunos</h2>
        <div class="for">
            <?php
                $xml= simplexml_load_file('C:\Users\Landeiras\Documents\GitHub\WEB\Lab3\pauta.xml');
                $nota = 0;
                for($i = 0; $i<=4; $i++){
                    echo 'Número: ' .$xml->aluno[$i]->attributes()."<br>";
                    echo "<br>";
                    echo 'Nome: ' .$xml->aluno[$i]->nome."<br>";
                    echo "<br>";
                    $nota = ($xml->aluno[$i]->exam1 + $xml->aluno[$i]->exam2)/2;
            ?>
            <table border="1">
                <tr>
                    <td><?php echo 'Exame 1: '?></td>
                    <td><?php echo $xml->aluno[$i]->exam1?></td>
                </tr>
                <tr>
                    <td><?php echo 'Exame 2: '?></td>
                    <td><?php echo  $xml->aluno[$i]->exam2?></td>
                </tr>
                <tr>
                    <td class="nota"><?php echo 'Nota Final: '?></td>
                    <td class="nota"><?php echo $nota?></td>
                </tr>
            </table>              
            </div>
            <div class="reprovado">
                <?php
                    if($nota < 9.5){
                        echo "Aluno/a reprovado/a<br>";
                    }
                ?>
            </div>
            <div class="aprovado">
                <?php
                    if($nota >=9.5){
                        echo "Aluno/a aprovado/a<br>";
                    }
                ?>
            </div>
            <div>
                <?php
                    echo "<hr>";
                }
                ?>
            </div>
        </div>     
    </body>
</html>