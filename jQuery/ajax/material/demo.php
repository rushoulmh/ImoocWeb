<?php
$name = isset($_POST["name"]) ? htmlspecialchars($_POST["name"]) : "";
echo "姓名：".$name;
?>