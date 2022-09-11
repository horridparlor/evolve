<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Max-Age: 86400");

$id = "../pages/" . $_GET["title"] . "/" . $_GET["chapter"] . ".json";
echo file_get_contents($id);
