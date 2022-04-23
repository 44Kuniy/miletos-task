# Installation

run `npm install <PATH_TO_THIS_REPOSITORY>` to add this package.

# Usage Example

```js
const sysctlParser = require("sysctl-parser");
const obj = sysctlParser(`endpoint = localhost:3000
 test = testVal
# test2 = t2va
; test3 = t3va
debug = true
log.file = /var/log/console.log
debug == true
dasdasbjdnw:
count = 452`);

/* 
  obj = 
  {
    endpoint: 'localhost:3000',
    test: 'testVal',
    debug: true,
    log: { file: '/var/log/console.log' },
    count: 452
  }
*/
```

# Run Example code

1. `yarn install` to install packages
1. `yarn example` to execute the example data(in data/example.txt)
1. `yarn test` to test(with jest)
