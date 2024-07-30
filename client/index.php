<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: login.php'); // Redirect to login if not logged in
    exit();
}

echo "<input type='hidden' id='userID' name='userID' value='".$_SESSION['username']."' />";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sidebar Navigation</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.5/socket.io.js"></script>
</head>

<body>
    <div class="sidebar">
        <div class="profile">
            <img src="profile-pic.png" alt="Profile Picture">
            <span><?=$_SESSION["username"]?></span>
            <span class="status online">Online</span>
        </div>
        <nav>
        <ul id="online_user_list">
             <!--   <li><a href="#" class="nav-link" data-chat="Chat 1"><i class="fas fa-th-large"></i> Dashboards</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 2"><i class="fas fa-layer-group"></i> Layouts</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 3"><i class="fas fa-chart-bar"></i> Graphs</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 4"><i class="fas fa-th"></i> Grid options</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 5"><i class="fas fa-table"></i> Tables</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 6"><i class="fas fa-shopping-cart"></i> E-commerce</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 7"><i class="fas fa-chart-line"></i> Metrics</a></li>
                <li><a href="#" class="nav-link" data-chat="Chat 8"><i class="fas fa-file-alt"></i> Other Pages</a></li>
            -->
            </ul>
        </nav>
    </div>
    <div class="main-content">
        <!-- Main content goes here -->
    </div>

    <div id="chat-windows-container"> hi </div>
    

<script src="js/index.js"> </script>
</body>

</html>