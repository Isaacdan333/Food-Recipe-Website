<?php

if(empty($_POST["username"]))
{
    die("Name is required");
}

if(strlen($_POST["password"]) < 8)
{
    die("Password must be at least 8 characters");
}

if (!preg_match("/[a-z]/i", $_POST["password"]))
{
    die("Password must contain at least one letter");
}

if (!preg_match("/[0-9]/", $_POST["password"]))
{
    die("Password must contain at least one number");
}
//email validation?
// pasword confirmation?

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO usersignup (username, password_hash)
        VALUES (?, ?)";

$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql))
{
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("ss", $_POST["username"], $password_hash);

$stmt->execute();

header("Location: index.html");
exit;

?>