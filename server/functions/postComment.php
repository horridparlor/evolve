<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Max-Age: 600");

include_once '../system/post.php';

$post = new Post();
$post->log("comments");
