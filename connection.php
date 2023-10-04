<?php
// Replace with your database credentials
$dbHost = "your_database_host";
$dbUser = "your_database_username";
$dbPass = "your_database_password";
$dbName = "login_system";

// Create a database connection
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user input
$username = $_POST["username"];
$password = $_POST["password"];

// Query the database to retrieve the hashed password for the provided username
$query = "SELECT id, password FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($userId, $hashedPassword);
$stmt->fetch();
$stmt->close();

// Verify the password
if (password_verify($password, $hashedPassword)) {
    // Authentication successful, you can store user information in sessions or cookies
    // Redirect to a secure page
    header("Location: secure_page.php");
    exit;
} else {
    // Authentication failed, display an error message
    echo "Invalid username or password.";
}

// Close the database connection
$conn->close();
?>
