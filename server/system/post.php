<?php

class Post
{
    public function log($folder)
    {
        $logPath = "../" . $folder . "/" . $_GET["app"] . "/" . $_GET["id"] . ".json";
        $data = $_GET["data"];
        if (file_exists($logPath)) {
            echo '{"status": "Success"}';
            if (!validateData($data)) {
                die();
            }
            updateLog($logPath, $data);
        } else {
            echo '{"status": "Failure"}';
        };
    }
}

function validateData($data)
{
    $dataLen = strlen($data);
    $MIN_LEN = 2;
    $MAX_LEN = 256;
    if ($dataLen >= $MIN_LEN && $dataLen <= $MAX_LEN) {
        return true;
    }
    return false;
}

function isDuplicateData($reader, $logs, $data)
{
    $i = $reader - 1;
    if ($i == -1) {
        $i = count($logs) - 1;
    }
    return $logs[$i] == $data;
}

function updateLog($logPath, $data)
{
    $MAX_LOGS = 32;
    $log = file_get_contents($logPath);
    $log = json_decode($log, true);
    $index = $log["index"];
    $counter = $log["counter"];
    if (isDuplicateData($index, $log["logs"], $data)) {
        die();
    }
    if (!array_key_exists("index", $log) || $index >= $MAX_LOGS || !($index >= 0)) {
        $index = 0;
    }
    if (!array_key_exists("counter", $log)) {
        $counter = 0;
    }
    $log["logs"][$index] = $data;
    $log["index"] = $index + 1;
    $log["counter"] = $counter + 1;
    $log = json_encode($log);
    file_put_contents($logPath, $log);
}
