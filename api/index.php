<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");

include 'DbConnect.php';
include 'encryption.php';

    //$encryption_key = bin2hex(openssl_random_pseudo_bytes(32));


$objDb=new DbConnect;   
$conn=$objDb->connect();
$user=file_get_contents('php://input');
$method=$_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        $user=json_decode(file_get_contents('php://input'));

        if (!isset($user->encryption_key) || empty($user->encryption_key)) {
            $response = ['status' => 0, 'message' => 'Encryption key is required'];
            echo json_encode($response);
            echo json_encode($user->encryption_key);
            exit;
        }
        $encryption_key = $user->encryption_key;
        $encrypted_email = encrypt($user->email, $encryption_key);

        echo("The encrypted email is:");
        echo($encrypted_email);

        $decrypted_email = decrypt($encrypted_email, $encryption_key);
        echo("The decrypted email is:");
        echo($decrypted_email);
        
        $sql="INSERT INTO users(id,name,email,mobile,create_at) VALUES(null,:name,:email,:mobile,:create_at)";
        $stmt=$conn->prepare($sql);
        $create_at=date('Y-m-d');
        $stmt->bindParam(':name',$user->name);
        $stmt->bindParam(':email',$encrypted_email);
        $stmt->bindParam(':mobile',$user->mobile);
        $stmt->bindParam(':create_at',$user->create_at);
        if($stmt->execute()){
            $response=['status'=>1,'message'=>'Record created successfully'];
        }
        else{
            $response=['status'=>0,'message'=>'Failed to create record'];
        }
        echo json_encode($response);
        break;
}
?>