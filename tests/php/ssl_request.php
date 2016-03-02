<?php
$url = 'https://code.jquery.com/jquery-2.2.1.js';
print 'access: '.$url."\n";
$bin = file_get_contents($url);
print 'done:'."\n";
var_dump($bin);
exit();
