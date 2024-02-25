<?php
$cities = array("Tokyo", "London", "New York", "Paris", "Berlin");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cities</title>
</head>
<body>
    <h2>Cities</h2>
    <ul>
        <?php
        foreach ($cities as $city) {
            echo "<li>$city</li>";
        }
        ?>
    </ul>
</body>
</html>