# Explanation

### Overview

This package can parse `sysctl.conf` file into object.
If you want to define scheme, pass it as a second parameter.

**`sysctl.conf` file example**

```example.txt
endpoint = localhost:3000
 test = testVal
# test2 = t2va
; test3 = t3va
debug = true
product = false
log.file = /var/log/console.log
log.conf.file = /var/log/config
debug == true
dasdasbjdnw:
count = 452
port = 80
```

#### scheme format

- Scheme file format is as same as `sysctl.conf` except for the separator (use `->` not `=`)
- You can define`string`, `number`, `boolean` or `undefined` type now.

**scheme file example**

```scheme.txt
endpoint -> string
  debug -> boolean
# product -> boolean
product ->  string
log.file -> number
log.conf.file -> string
; log.conf.template -> string
count -> number
port -> string
count = number
```

# Installation

run `npm install <PATH_TO_THIS_REPOSITORY>` to add this package.

# Usage Example

- without scheme

```js
const sysctlParser = require("sysctl-parser");
const sysctlFileContents = `endpoint = localhost:3000
 test = testVal
# test2 = t2va
; test3 = t3va
debug = true
product = false
log.file = /var/log/console.log
log.conf.file = /var/log/config
debug == true
dasdasbjdnw:
count = 452
port = 80`;

const obj = sysctlParser(sysctlFileContents);

/* 
  obj = 
  {
    endpoint: 'localhost:3000',
    test: 'testVal',
    debug: true,
    product: false,
    log: { file: '/var/log/console.log', conf: { file: '/var/log/config' } },
    count: 452,
    port: 80
  }
*/
```

- with scheme

```js
const sysctlParser = require("sysctl-parser");
const sysctlFileContents = `endpoint = localhost:3000
 test = testVal
# test2 = t2va
; test3 = t3va
debug = true
product = false
log.file = /var/log/console.log
log.conf.file = /var/log/config
debug == true
dasdasbjdnw:
count = 452
port = 80`;

const schemeFileContents = `endpoint -> string
  debug -> boolean
# product -> boolean
product ->  string
log.file -> number
log.conf.file -> string
; log.conf.template -> string
count -> number
port -> string
count = number`;

const obj = sysctlParser(sysctlFileContents, schemeFileContents);

/* 
  obj = 
  {
    endpoint: 'localhost:3000',
    debug: true,
    log: { conf: { file: '/var/log/config' } },
    count: 452
  }
*/
```

# Run Example code

1. `yarn install` to install packages
1. `yarn example` to execute the example data(in data/example.txt)
1. `yarn test` to test(with jest)
