<?php
// Include the database configuration file
include("config.php");

// Initialize variables
$username = "";
$password = "";
$confirm_password = "";
$errors = array();

// Register user
if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validation: Ensure that form fields are not empty
    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }
    if ($password != $confirm_password) {
        array_push($errors, "Passwords do not match");
    }

    // If no errors, insert user into database
    if (count($errors) == 0) {
        // Hash the password before storing in the database (use bcrypt or other secure hashing method)
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert user data into the users table
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashed_password);
        $stmt->execute();
        $stmt->close();

        // Redirect to the login page
        header("location: login.html");
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Registration</title>
</head>
<body>
    <h2>Register</h2>
    <form method="post" action="registration.php">
        <?php include('errors.php'); ?>
        <div>
            <label>Username:</label>
            <input type="text" name="username" value="<?php echo $username; ?>">
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password">
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirm_password">
        </div>
        <div>
            <button type="submit" name="register">Register</button>
        </div>
        <p>
            Already have an account? <a href="login.php">Login</a>
        </p>
    </form>
</body>
</html>