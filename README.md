# node-php-bin

## Usage

```js
var nodePhpBin = require('node-php-bin').get();

nodePhpBin.script('/path/to/php_script.php', function(data, error, code){
    console.log(data, error, code);
});
```
