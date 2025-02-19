# @putout/plugin-nodejs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-nodejs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-nodejs "npm"

> **Node.js** is an open-source, cross-platform, **JavaScript** runtime environment.
>
> (c) [Nodejs.org](https://nodejs.org/en/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new **Node.js** API and apply best practices.

## Install

```
npm i putout @putout/plugin-nodejs -D
```

## Options

```json
{
    "rules": {
        "nodejs/convert-commonjs-to-esm": "off",
        "nodejs/convert-esm-to-commonjs": "off",
        "nodejs/cjs-file": "off",
        "nodejs/mjs-file": "off",
        "nodejs/rename-file-cjs-to-js": "off",
        "nodejs/add-node-prefix": "on",
        "nodejs/convert-buffer-to-buffer-alloc": "on",
        "nodejs/convert-fs-promises": "on",
        "nodejs/convert-promisify-to-fs-promises": "on",
        "nodejs/convert-dirname-to-url": "on",
        "nodejs/convert-exportst-to-module-exports": "on",
        "nodejs/convert-url-to-dirname": "on",
        "nodejs/convert-top-level-return": "on",
        "nodejs/declare": "on",
        "nodejs/declare-after-require": "on",
        "nodejs/remove-process-exit": "on",
        "nodejs/add-missing-strict-mode": "on",
        "nodejs/remove-useless-strict-mode": "on"
    }
}
```

## add-node-prefix

> `Deno` supports using Node.js built-in modules such as `fs`, `path`, `process`, and many more via `node`: specifiers.
>
> (c) [deno.land](https://deno.land/manual@v1.36.3/node/node_specifiers)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/534093e0bf0a4407796c08d62bcbcb92/766a1d608f155920b21aa1f53a8e33280a664309).

### ❌ Example of incorrect code

```js
import fs from 'fs';
```

### ✅ Example of correct code

```js
import fs from 'node:fs';
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-node-prefix`](https://github.com/coderaiser/putout/tree/master/packages/plugin-nodejs/apply-node-prefix#readme) | ✅
⏣ **ESLint** | [`prefer-node-protocol`](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-node-protocol.md#readme)  | ✅

## convert-buffer-to-buffer-alloc

> The `Buffer()` function and `new Buffer()` constructor are **deprecated** due to API usability issues that can lead to accidental security issues.
>
> (c) [DEP0005](https://nodejs.org/api/deprecations.html#deprecations_dep0005_buffer_constructor)

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/5379bcdfa3d76f7b7121c9671ae48375/2fc2c7f96fc8284788c00914a9b29bfeea8b13d4).

### ❌ Example of incorrect code

```js
const n = 100;
const buf = [];

new Buffer(123);
new Buffer(n);
new Buffer('hello');

new Buffer([]);
new Buffer(buf);
```

### ✅ Example of correct code

```js
const n = 100;
const buf = [];

Buffer.alloc(123);
Buffer.alloc(n);
Buffer.from('hello');

Buffer.from([]);
Buffer.from(buf);
```

## convert-fs-promises

Convert [fs.promises](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_promises_api) into form that will be simpler to use and convert to and from **ESM**.

### ❌ Example of incorrect code

```js
const {readFile} = require('fs').promises;
```

### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
```

## convert-promisify-to-fs-promises

### ❌ Example of incorrect code

```js
const fs = require('fs');
const readFile = promisify(fs.readFile);
```

### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
```

## convert-dirname-to-url

Only for **ESM**.

### ❌ Example of incorrect code

```js
const {join} = require('path');
const path = require('path');

const file1 = join(__dirname, '../../package.json');
const file2 = path.join(__dirname, '../../package.json');
```

### ✅ Example of correct code

```js
const file1 = new URL('../../package.json', import.meta.url);
const file2 = new URL('../../package.json', import.meta.url);
```

## convert-url-to-dirname

Only for **CommonJS**.

### ❌ Example of incorrect code

```js
const {readFile} = require('fs/promises');
const file = new URL('../../package.json', import.meta.url);
```

### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
const {join} = require('path');
const file = join(__dirname, '../../package.json');
```

## remove-process-exit

In most cases `process.exit()` is called from `bin` directory, if not - disable this rule using `match`.

```diff
-process.exit();
```

## convert-exports-to-module-exports

Since `exports = 5` wan't make any export, just change value of variable.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8b2af2c4ad005ed1c77cde41377caaad/dfdccc794037d7f67bde1e7d7244bf5f14abebce).

### ❌ Example of incorrect code

```js
exports.x = 5;
```

### ✅ Example of correct code

```js
module.exports.x = 5;
```

## convert-top-level-return

### ❌ Example of incorrect code

```js
return;
```

### ✅ Example of correct code

```js
process.exit();
```

## declare

Add declarations to built-in node.js modules:

- [child_process](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html);
- [events](https://nodejs.org/dist/latest-v18.x/docs/api/events.html);
- [fs](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html);
- [path](https://nodejs.org/dist/latest-v18.x/docs/api/path.html);
- [process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html);
- [module](https://nodejs.org/dist/latest-v18.x/docs/api/module.html);
- [stream](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html);
- [os](https://nodejs.org/dist/latest-v18.x/docs/api/os.html);
- [url](https://nodejs.org/dist/latest-v18.x/docs/api/url.html);
- [util](https://nodejs.org/dist/latest-v18.x/docs/api/util.html);
- [zlib](https://nodejs.org/dist/latest-v18.x/docs/api/zlib.html);

Based on [`@putout/operator-declare`](https://github.com/coderaiser/putout/tree/master/packages/operator-declare#putoutoperator-declare-).

### ❌ Example of incorrect code

```js
await readFile('hello.txt', 'utf8');
```

### ✅ Example of correct code

```js
import {readFile} from 'fs/promises';

await readFile('hello.txt', 'utf8');
```

When you want to skip some declaration use `dismiss`:

```json
{
    "rules": {
        "nodejs/declare": ["on", {
            "dismiss": ["readFile"]
        }]
    }
}
```

## declare-after-require

> **Node.js** follows the **CommonJS** module system, and the builtin `require` function is the easiest way to include modules that exist in separate files. The basic functionality of `require` is that it reads a JavaScript file, executes the file, and then proceeds to return the `exports` object.
>
> (c) [Nodejs.org](https://nodejs.org/en/knowledge/getting-started/what-is-require/)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/https://putout.cloudcmd.io/#/gist/ddf5731ae829beec4d3018d4d9ac2150/342738b63337bfa9b4fc08c5b301483ea2b5ba9c).

### ❌ Example of incorrect code

```js
const name = 'hello.txt';
const {readFile} = require('fs/promises');
```

### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
const name = 'hello.txt';
```

## convert-commonjs-to-esm

Convert **CommonJS** **EcmaScript Modules**.

> **EcmaScript module** syntax is the standard way to import and export values between files in **JavaScript**. The `import` statement can be used to reference a value exposed by the `export` statement in another file.
>
> (c) [parceljs](https://parceljs.org/languages/javascript/)

### require

### ❌ Example of incorrect code

```js
const {join} = require('path');

const args = require('minimist')({
    string: ['a', 'b'],
});
```

### ✅ Example of correct code

```js
import {join} from 'path';
import minimist from 'minimist';

const args = minimist({
    string: ['a', 'b'],
});
```

### exports

### ❌ Example of incorrect code

```js
module.exports = () => {};
```

### ✅ Example of correct code

```js
export default () => {};
```

### Commons

### ❌ Example of incorrect code

```js
const {readFile} = require('fs/promises');

await readFile(__filename);
```

### ✅ Example of correct code

```js
import {readFile} from 'fs/promises';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
await readFile(__filename);
```

## convert-esm-to-commonjs

> **CommonJS** is a module system supported in Node, it provides a `require` function, which can be used to access the `exports` object exposed by another file.
>
> (c) [parceljs](https://parceljs.org/languages/javascript/)

Convert **EcmaScript Modules** to **CommonJS**.

### ❌ Example of incorrect code

```js
import hello from 'world';
```

### ✅ Example of correct code

```js
const hello = require('world');
```

## cjs-file

Run [convert-esm-to-commonjs](#convert-esm-to-commonjs) for all `*.cjs` files with help of [redlint](https://github.com/putoutjs/redlint).

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/779e7fb720af59afc2d3da082088fd4c/d0b85b07c6aaf2b902a1c7eb7ae121dbcd181033).

## mjs-file

Run [convert-commonjs-to-esm](#convert-commonjs-to-esm) for all `*.cjs` files with help of [redlint](https://github.com/putoutjs/redlint).

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/779e7fb720af59afc2d3da082088fd4c/d0b85b07c6aaf2b902a1c7eb7ae121dbcd181033).

## rename-file-cjs-to-js

Rename `*.cjs` files when `module !== "module"`:

```diff
 /
 |-- package.json
 `-- lib/
-     `-- hello.cjs
+     `-- hello.js
```

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/8d8f3cd6662b70abbd5e4a2e4835077f/e43319fd63291ec3a5028b30a83f3c91fe90325e).

## rename-file-mjs-to-js

Rename `*.mjs` files when `module === "module"`:

```diff
 /
 |-- package.json
 `-- lib/
-     `-- hello.mjs
+     `-- hello.js
```

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/94fb3298b210e703b01db9a6826942bc/dfe2462451c6b3d4d47da7fd8d39dc8e53bb16eb).

## add-missing-strict-mode

> **Strict mode** makes several changes to normal **JavaScript** semantics:
>
> - Eliminates some **JavaScript** silent errors by changing them to throw errors.
> - Fixes mistakes that make it difficult for **JavaScript** engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
> - Prohibits some syntax likely to be defined in future versions of **ECMAScript**.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

Add **strict mode** to **CommonJS**:

### ❌ Example of incorrect code

```js
const a = require('b');
```

### ✅ Example of correct code

```js
'strict mode';

const a = require('b');
```

### ✅ Example of correct code

## remove-useless-strict-mode

Remove `'use strict'` from **ESM**.

### ❌ Example of incorrect code

```js
'strict mode';

import a from 'b';
```

### ✅ Example of correct code

```js
import a from 'b';
```

## License

MIT
