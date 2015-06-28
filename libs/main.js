/**
 * node-php-bin
 */
module.exports = new (function(){
	var childProcess = require('child_process');
	var fs = require('fs');

	this.get = function(options){
		var phpBin, phpVersion, phpIni, phpPresetCmdOptions;
		function phpAgent(options){
			options = options || {};
			phpBin = fs.realpathSync( __dirname+'/../bin/'+process.platform+'/'+(process.platform == 'win32'?'5.6.8':'5.6.7')+'/php'+(process.platform == 'win32'?'.exe':'') );
			phpIni = fs.realpathSync( __dirname+'/../bin/'+process.platform+'/php.ini' );
			phpPresetCmdOptions = [];
			if( process.platform == 'win32' ){
				phpPresetCmdOptions = phpPresetCmdOptions.concat([
					'-d', 'extension_dir='+fs.realpathSync( __dirname+'/../bin/'+process.platform+'/5.6.8/ext/' )
				]);
			}

			if(options.bin){
				phpBin = options.bin;
			}
			if(options.ini){
				phpPresetCmdOptions = [];
				phpIni = options.ini;
			}

			phpPresetCmdOptions = phpPresetCmdOptions.concat([
				'-c', phpIni
			]);
		}
		/**
		 * PHPのパスを取得
		 */
		phpAgent.prototype.getPath = function(){
			return fs.realpathSync(phpBin);
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
			if( typeof(cb) !== typeof(function(){}) ){cb = function(){};}
			options = options || {};
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
				data += row.toString();
			});
			child.stderr.on('data', function( err ){
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
