<?php
// Ensure the key is exactly 32 bytes for AES-256
function adjustKey($key) {
    // Hash the key to ensure it is exactly 32 bytes
    return substr(hash('sha256', $key, true), 0, 32);
}

function encrypt($data, $key) {
    $key = adjustKey($key); // Adjust the key size
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
    $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $encrypted);
}

function decrypt($data, $key) {
    $key = adjustKey($key); // Adjust the key size
    $data = base64_decode($data);
    $iv_length = openssl_cipher_iv_length('aes-256-cbc');
    $iv = substr($data, 0, $iv_length);
    $encrypted = substr($data, $iv_length);
    return openssl_decrypt($encrypted, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
}
?>
