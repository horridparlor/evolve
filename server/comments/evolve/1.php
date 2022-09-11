$logPath = "./comments/" . $_GET["title"] . "/" . $_GET["chapter"] . ".json";
$body = $_GET["body"];

if (file_exists($logPath)) {
echo '{"status": "Success"}';
if (!validatePost($body)) {
exit(405);
}
updateSessionLog($logPath, $body);
} else {
echo '{"status": "Failure"}';
};

function validatePost($body)
{
$bodyLen = strlen($body);
$MIN_LEN = 5;
$MAX_LEN = 256;
if ($bodyLen >= $MIN_LEN && $bodyLen <= $MAX_LEN) { return true; } return false; }; function updateSessionLog($logPath, $commentBody) { $sessionLog=file_get_contents($logPath); $sessionLog=json_decode($sessionLog, true); $MAX_COMMENTS=64; $i=$sessionLog['index']; if (!array_key_exists("index", $sessionLog) || $i>= $MAX_COMMENTS || !($i >= 0)) {
    $i = 0;
    }
    $sessionLog['comments'][$i] = $commentBody;
    $sessionLog['index'] = $i + 1;
    $sessionLog = json_encode($sessionLog);
    file_put_contents($logPath, $sessionLog);
    }