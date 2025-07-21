<?php
// DB credentials (update these with your actual cPanel DB info)
$host = "localhost";
$dbname = "dislyffo_dis_lesotho";
$username = "dislyffo_KevinMk";
$password = '24e4fcb6$MK1!q';

$conn = mysqli_connect($host, $username, $password, $dbname);


// Collect form input
$firstName = htmlspecialchars($_POST['firstName'] ?? '', ENT_QUOTES);
$lastName = htmlspecialchars($_POST['lastName'] ?? '', ENT_QUOTES);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$type = $_POST['registration_type'] ?? '';
$agreed = isset($_POST['agreeTnC']) ? 1 : 0;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if email already exists
    $check = $pdo->prepare("SELECT COUNT(*) FROM registrations_test WHERE email = ?");
    $check->execute([$email]);
    $exists = $check->fetchColumn();

    header('Content-Type: application/json');

    if ($exists) {
        echo json_encode([
            'status' => 'already_registered',
            'message' => 'You have already registered for the summit.'
        ]);
        exit;
    }

    // Insert into database
    $stmt = $pdo->prepare("INSERT INTO registrations_test (first_name, last_name, email, registration_type, agreed_terms) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $lastName, $email, $type, $agreed]);

    // Admin notification
    $adminEmail = "kevinmakebekk@google.com";
    $subjectAdmin = "New Registration - Digital Innovators Summit";
    $bodyAdmin = "New registration:\n\nName: $firstName $lastName\nEmail: $email\nType: $type";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: no-reply@dislesotho.com\r\n";
    $headers .= "Reply-To: no-reply@dislesotho.com\r\n";
    $headers .= "Return-Path: no-reply@dislesotho.com";

    mail($adminEmail, $subjectAdmin, $bodyAdmin, $headers, "-fno-reply@dislesotho.com");

    // Email to user
    $userEmail = $email;
    $subjectUser = "Registration Received – See You at the Digital Innovators Summit (24th July 2025)";
    $bodyUser = <<<EOT
Dear $firstName $lastName,

Thank you for registering for the Digital Innovators Summit via our official platform, www.dislesotho.com.

We are delighted to confirm receipt of your registration and look forward to welcoming you to what promises to be a fruitful, engaging, and enlightening gathering of minds. This year’s Summit offers a unique opportunity to explore the frontiers of digital literacy, ethical innovation, and transformative technologies within Africa's education and creative sectors.

We eagerly anticipate your participation as we shape the future of our digital landscape—together.

Warm regards,  
Digital Innovators Summit Team  
📍 Lesotho | 🌍 www.dislesotho.com | ✉ dis@skyalphahd.com
EOT;

    $headersUser = "MIME-Version: 1.0\r\n";
    $headersUser .= "Content-type: text/plain; charset=UTF-8\r\n";
    $headersUser .= "From: Digital Innovators Summit <no-reply@dislesotho.com>\r\n";
    $headersUser .= "Reply-To: dis@skyalphahd.com\r\n";
    $headersUser .= "Return-Path: no-reply@dislesotho.com";

    mail($userEmail, $subjectUser, $bodyUser, $headersUser, "-fno-reply@dislesotho.com");

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for registering!'
    ]);
    exit;

} catch (PDOException $e) {
    echo "<pre>";
    print_r($e);
    echo "</pre>";
    exit;
}
?>
