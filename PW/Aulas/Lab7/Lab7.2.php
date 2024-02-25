<?php 
$mmulticity = array(
    array("City", "Country", "Continent"),
    array("Tokyo", "Japan", "Asia"),
    array("London", "England", "Europe"),
    array("New York", "USA", "North America"),
    array("Paris", "France", "Europe"),
    array("Berlin", "Germany", "Europe")
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GeoInfo</title>
</head>
<body>
    <table border=1>
        <?php
        foreach ($mmulticity as $city) {
            echo "<tr>";
            foreach ($city as $info) {
                echo "<td>$info</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>