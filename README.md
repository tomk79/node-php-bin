# node-php-bin

<table>
  <thead>
    <tr>
      <th></th>
      <th>Linux</th>
      <th>Windows</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>master</th>
      <td align="center">
        <a href="https://travis-ci.org/tomk79/node-php-bin"><img src="https://secure.travis-ci.org/tomk79/node-php-bin.svg?branch=master"></a>
      </td>
      <td align="center">
        <a href="https://ci.appveyor.com/project/tomk79/node-php-bin"><img src="https://ci.appveyor.com/api/projects/status/1puhabq8314trwqt/branch/master?svg=true"></a>
      </td>
    </tr>
    <!-- tr>
      <th>develop</th>
      <td align="center">
        <a href="https://travis-ci.org/tomk79/node-php-bin"><img src="https://secure.travis-ci.org/tomk79/node-php-bin.svg?branch=develop"></a>
      </td>
      <td align="center">
        <a href="https://ci.appveyor.com/project/tomk79/node-php-bin"><img src="https://ci.appveyor.com/api/projects/status/1puhabq8314trwqt/branch/develop?svg=true"></a>
      </td>
    </tr -->
  </tbody>
</table>

[![NPM](https://nodei.co/npm/node-php-bin.png)](https://nodei.co/npm/node-php-bin/)

## Usage

```js
var nodePhpBin = require('node-php-bin').get();

// PHPスクリプトを実行する
nodePhpBin.script(
  ['/path/to/php_script.php'],
  function(data, error, code){
    console.log(data, error, code);
  }
);

// PHPスクリプトを実行
//   ( require('child_process').spawn() にオプションを渡す場合)
nodePhpBin.script(
  ['/path/to/php_script.php'],
  {} , // options for require('child_process').spawn()
  function(data, error, code){
    console.log(data, error, code);
  }
);

// PHPスクリプトを実行
//   (詳細な途中経過を知りたい場合)
nodePhpBin.script(
  ['/path/to/php_script.php'],
  {} , // options for require('child_process').spawn()
  {
    "success": function(data){
      console.log(data);
    } ,
    "error": function(data){
      console.log(data);
    } ,
    "complete": function(data, error, code){
      console.log(data, error, code);
    }
  }
);

// PHP のパスを取得する
var pathPhp = nodePhpBin.getPath();

// php.ini のパスを取得する
var pathPhpIni = nodePhpBin.getIniPath();

// Extension Directory のパスを取得する
var pathPhpExtDir = nodePhpBin.getExtensionDir();

// PHPのバージョンを取得する
nodePhpBin.getPhpVersion(
  function(versionStr){
    console.log(versionStr);
  }
);
```

## Options

```js
var nodePhpBin = require('node-php-bin').get({
    'bin': '/path/to/php',
    'ini': '/path/to/php.ini'
});
```

## for developer

### PHP for Darwin build command

```
$ curl -Lso php-5.6.8.tar.gz http://jp2.php.net/get/php-5.6.8.tar.gz/from/this/mirror
$ tar xfz php-5.6.8.tar.gz
$ cd php-5.6.8
$ ./configure \
--enable-mbstring=all \
--enable-mbregex \
--enable-zip \
--with-openssl \
--without-iconv \
--prefix=/dev/null \
--exec-prefix=/dev/null \
--sysconfdir=/dev/null \
--with-config-file-path=/dev/null
$ make
```

`make install` は実行しないでください。
ビルドされた php は、 `./sapi/cli/php` に出力されます。

#### Mac OS X El Capitan でビルドが失敗する場合

事前に下記をインストールしてからもう一度実行すると、解決する場合があります。

```
$ brew install openssl
$ brew install libxml2
$ brew link openssl --force
$ brew link libxml2 --force
```
