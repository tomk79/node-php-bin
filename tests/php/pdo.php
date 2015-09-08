<?php
$pdo = new \PDO(
	'sqlite:'.__DIR__.'/pdo.sqlite',
	null, null,
	array(
		\PDO::ATTR_PERSISTENT => false, // ←これをtrueにすると、"持続的な接続" になる
	)
);
print 'ok';
exit;