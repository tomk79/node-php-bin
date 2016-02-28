/**
 * node-php-bin
 */
module.exports = new (function(){
	var childProcess = require('child_process');
	var fs = require('fs');
	var _platform = process.platform;

	this.get = function(options){
		var phpBin, phpVersion, phpIni, phpExtensionDir, phpPresetCmdOptions;
		function phpAgent(options){
			options = options || {};
			phpPresetCmdOptions = [];
			phpExtensionDir = null;
			if( _platform == 'linux' ){
				// linux で動くバイナリは含まれていないので、
				// 内部コマンドをデフォルトにする。
				phpBin = 'php';
				phpIni = null;
			}else{
				phpBin = fs.realpathSync( __dirname+'/../bin/'+_platform+'/'+(_platform == 'win32'?'5.6.8':'5.6.8')+'/php'+(_platform == 'win32'?'.exe':'') );
				phpIni = fs.realpathSync( __dirname+'/../bin/'+_platform+'/php.ini' );
			}
			if( _platform == 'win32' ){
				phpExtensionDir = fs.realpathSync( __dirname+'/../bin/'+_platform+'/5.6.8/ext/' );
				phpPresetCmdOptions = phpPresetCmdOptions.concat([
					'-d', 'extension_dir='+phpExtensionDir
				]);
			}

			if(options.bin){
				phpBin = options.bin;
			}
			if(options.ini){
				phpPresetCmdOptions = [];// windows向けの -d オプションを削除する
				phpIni = options.ini;
			}

			if( phpIni !== null ){
				phpPresetCmdOptions = phpPresetCmdOptions.concat([
					'-c', phpIni
				]);
			}
		}

		/**
		 * PHP のパスを取得
		 */
		phpAgent.prototype.getPath = function(){
			if(phpBin == 'php'){return phpBin;}
			return fs.realpathSync(phpBin);
		}

		/**
		 * php.ini のパスを取得
		 */
		phpAgent.prototype.getIniPath = function(){
			if(phpIni == null){return null;}
			return fs.realpathSync(phpIni);
		}

		/**
		 * phpExtensionDir を取得
		 */
		phpAgent.prototype.getExtensionDir = function(){
			if(phpExtensionDir == null){return null;}
			return fs.realpathSync(phpExtensionDir);
		}

		/**
		 * PHPのバージョン番号を得る
		 */
		phpAgent.prototype.getPhpVersion = function(cb){
			cb = cb || function(){};
			var child = this.spawn(
				['-v'],
				{}
			);
			var data = '';
			child.stdout.on('data', function(row){
				data += row.toString();
			});
			child.stderr.on('data', function(error){
				data += error.toString();
			});
			child.on('exit', function(code){
				var rtn = data;
				data.match(new RegExp('^PHP\\s+([0-9]+\\.[0-9]+\\.[0-9])'));
				rtn = RegExp.$1;
				// console.log(rtn);
				cb(rtn);
			});
			return this;
		}

		/**
		 * PHPコマンドを実行する
		 */
		phpAgent.prototype.script = function(cliParams, options, cb){
			cb = arguments[arguments.length-1];
			var scriptOptions = {};
			var success = function(){};
			var error = function(){};
			if( typeof(cb) === typeof({}) ){
				scriptOptions = cb;
				cb = scriptOptions.complete || function(){};
				success = scriptOptions.success || function(){};
				error = scriptOptions.error || function(){};
				// console.log(cb);
				// console.log(scriptOptions);
			}
			if( typeof(cb) !== typeof(function(){}) ){
				cb = function(){};
			}
			options = options || {};
			if(arguments.length < 2){
				options = {};
			}
			if( typeof(options) !== typeof({}) ){
				options = {};
			}

			var child = this.spawn(
				cliParams,
				options
			);
			var data = '';
			var error = '';
			child.stdout.on('data', function( row ){
				success(row.toString());
				data += row.toString();
			});
			child.stderr.on('data', function( err ){
				error(err.toString());
				data += err.toString();
				error += err.toString();
			});
			child.on('exit', function(code){
				cb( data, error, code );
			});
			return this;
		}

		/**
		 * PHPコマンドを実行する(spawn)
		 */
		phpAgent.prototype.spawn = function(cliParams, options){
			cliParams = cliParams || [];
			options = options || {};
			var child = childProcess.spawn(
				phpBin,
				phpPresetCmdOptions.concat(cliParams),
				options
			);
			return child;
		}

		return new phpAgent(options);
	}

})();
