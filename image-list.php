<?php
$folder = 'drop1';
$images = glob($folder . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

header('Content-Type: application/json');
echo json_encode($images);
?>
