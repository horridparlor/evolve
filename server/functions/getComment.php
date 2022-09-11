<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Max-Age: 600");

$id = "../comments/" . $_GET["title"] . "/" . $_GET["chapter"] . ".json";
echo file_get_contents($id);
