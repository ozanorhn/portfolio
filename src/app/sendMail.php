<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    
    case("POST"): 
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $email = htmlspecialchars($params->email);
        $name = htmlspecialchars($params->name);
        $message = nl2br(htmlspecialchars($params->message));

        $recipient = 'contact@ozan-orhan.com';
        $subject = "Contact Form Message from $name";

        $body = "From: $name &lt;$email&gt;<br><br>" . $message;

        $headers   = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: noreply@mywebsite.com";
        $headers[] = "Reply-To: $email"; 
        $headers[] = "X-Mailer: PHP/" . phpversion();


        mail($recipient, $subject, $body, implode("\r\n", $headers));
        

        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
        break;

    default: 
        header("Allow: POST", true, 405);
        exit;
}
