var assert = require('assert');
// var path = require('path');
var fs = require('fs');

function getPhp( options ){
	return require('../libs/main.js').get(options);
}

describe('デフォルト設定でコマンドを実行する', function() {
	var php = getPhp();

	it("PHPバイナリのパスを取得", function(done) {
		var phpPath = php.getPath();
		var path = undefined;
		if(process.platform == 'darwin'){
			path = fs.realpathSync(__dirname+'/../bin/darwin/5.6.7/php');
		}else if(process.platform == 'win32'){
			path = fs.realpathSync(__dirname+'/../bin/win32/5.6.8/php.exe');
		}
		assert.equal(phpPath, path);
		done();
	});

	it("PHPバイナリのバージョン番号を得る", function(done) {
		var child = php.getPhpVersion(function(gotVersion){
			var version;
			if(process.platform == 'darwin'){
				version = '5.6.7';
			}else if(process.platform == 'win32'){
				version = '5.6.8';
			}
			assert.equal(gotVersion, version);
			done();
		});
	});

	it("script 'helloworld.php' - 1", function(done) {
		var child = php.script(
			[__dirname+'/php/helloworld.php'],
			{},
			function( data, error, code ){
				assert.equal(code, 0);
				assert.equal(data, 'helloworld');
				done();
			}
		);
	});

	it("script 'helloworld.php' - 2", function(done) {
		var child = php.script(
			[__dirname+'/php/helloworld.php'],
			function( data, error, code ){
				assert.equal(code, 0);
				assert.equal(data, 'helloworld');
				done();
			}
		);
	});

	it("spawn 'mbstring.php'", function(done) {
		var child = php.spawn(
			[__dirname+'/php/mbstring.php'],
			{}
		);
		var data = '';
		child.stdout.on('data', function( row ){
			data += row.toString();
		});
		child.stderr.on('data', function( err ){
			data += err.toString();
		});
		child.on('exit', function(code){
			assert.equal(code, 0);
			assert.equal(data.toLowerCase(), 'utf-8');
			done();
		});
	});
});
