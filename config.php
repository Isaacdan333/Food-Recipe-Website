<?php
//// Database configuration
//$servername = "localhost"; // Replace with your MySQL server hostname or IP address
//$username = "root"; // Replace with your MySQL username
//$password = ""; // Replace with your MySQL password
//$database = "login_db"; // Replace with the name of your database
//
//// Create a database connection
//$conn = new mysqli($servername, $username, $password, $database);
//
//// Check the connection
//if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
//}

$name = $_POST["username"];
$userkey = $_POST["password"];

$host = "localhost";
$dbname = "recipewebsite";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

// check if there was a connection error
if (mysqli_connect_errno())
{
    die("Connection Error: " . mysqli_connect_error());
}

$sql = "INSERT INTO user_info (username, password)
        VALUES (?, ?)";

$stmt = mysqli_stmt_init($conn);

mysqli_stmt_prepare($stmt, $sql);

// return boolean success value, if false print out error, stops script
if (! mysqli_stmt_prepare($stmt, $sql))
{
    die(mysqli_error($conn));
}

//https://www.php.net/manual/en/mysqli-stmt.bind-param.php#refsect1-mysqli-stmt.bind-param-parameters
mysqli_stmt_bind_param($stmt, "ss", $name, $userkey);

mysqli_stmt_execute($stmt);


header("Location: index.html");

?>
