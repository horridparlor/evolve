<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Max-Age: 86400");

$id = "../data/" . $_GET["id"] . ".json";
echo file_get_contents($id);
