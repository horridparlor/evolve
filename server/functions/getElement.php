<?php

header("Content-Type: text/html");
header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
header("Access-Control-Max-Age: 86400");

$id = "../elements/" . $_GET["id"] . ".html";
include $id;
