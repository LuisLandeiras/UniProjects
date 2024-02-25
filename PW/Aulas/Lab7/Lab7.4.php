<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Visits</title>
</head>
<body>
<?php
    if (!IsSet($_SESSION['visit_count'])) {
        $_SESSION['visit_count'] = 1;
        echo "Welcome to the first time!";
    }
    else{
       $num = $_SESSION['visit_count']++;
        echo "Welcome back! You have visited this page $num times.";
    }
    $self_url = $_SERVER['PHP_SELF'];
    $session_id = SID;
    if (IsSet($session_id) && $session_id) {
        $href = "$self_url?$session_id";
    } else{
        $href = $self_url;
    }
    echo "<BR><A HREF=\"$href\">Visit us again</A> sometime";
?>
</body>
</html>