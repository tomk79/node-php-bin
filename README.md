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

nodePhpBin.script('/path/to/php_script.php', function(data, error, code){
    console.log(data, error, code);
});
```
