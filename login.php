<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Replace with your actual username and password validation logic
    $validUsername = "your_username";
    $validPassword = "your_password";

    // Check if the submitted username and password match the valid credentials
    if ($username === $validUsername && $password === $validPassword) {
        // Authentication successful, redirect to a secure page
        header("Location: secure_page.php");
        exit;
    } else {
        // Authentication failed, display an error message
        echo "Invalid username or password.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <style>
        body {
            background-image: url('Background Image/Foods.jpeg');
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        #login-container {
            background-color: #ffffff90; 
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="login-container">
        <h2>Login</h2>
        <form action="login.php" method="POST">
            <label for="username"><b>Username:</b></label>
            <input type="text" id="username" name="username" required><br><br>
            
            <label for="password"><b>Password:</b></label>
            <input href="login.php" type="password" id="password" name="password" required><br><br>

            <input type="submit" value="Login">
        </form>
    </div>
</body>
</html>