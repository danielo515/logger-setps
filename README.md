# steps-logger

![Node](https://img.shields.io/node/v/steps-logger.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/steps-logger.svg?style=flat-square)](https://www.npmjs.com/package/steps-logger)
[![Travis](https://img.shields.io/travis/danielo515/steps-logger/master.svg?style=flat-square)](https://travis-ci.org/danielo515/steps-logger)
[![David](https://img.shields.io/david/danielo515/steps-logger.svg?style=flat-square)](https://david-dm.org/danielo515/steps-logger)
[![Coverage Status](https://img.shields.io/coveralls/danielo515/steps-logger.svg?style=flat-square)](https://coveralls.io/github/danielo515/steps-logger)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

> Group log messages and send them grouped the logger of your choize

Log messages are useful, but they can be missleading if the order is not correct or if related messages
do not appear close to each other (which is quite common on asynchronous programming).
Grouping messages could be a pain and would force you to refactorize your code deeply.

This library fixes this situation by wrapping the logger of your choize and providing an interface that mimics the one
of the logger. Then you can use the returned API in the same way you are used to but messages will be grouped toghether.

### Usage

The most basic usage is as follows:

```js
import stepsLogger from 'steps-logger';

trace = stepsLogger(console /* Reporter */, 'AUTH-FLOW' /* Flow title */, 15 /* Automatic flush timeout */);

trace.info('Starting auth flow', user.email);
/* Do things here ...*/
trace.warn('Something failed, trying alternative...');
/* Do more things here */
trace.error('The flow failed totally',error.message)
/* Send all the messages in one go to the selected logger, in this case the console*/
trace.flush();
/* Console output...
AUTH-FLOW:
 { title: 'Starting auth flow', details: 'yo@yo.com' }
 { title: 'Something failed, trying alternative...' }
 { title: 'The flow failed totally', details: 'User does not exists' }

*/

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

    yarn add steps-logger (--dev)

or npm

    npm install steps-logger (--save-dev)


### configuration

You can pass in extra options to configure the behavior of the tracer (➕ required, ➖ optional, ✏️ default).

```js
import stepsLogger from 'steps-logger';

```

➕ **logger** ( logger )
<br/> 📝 The logger you want to report to
<br/> ❗️ currently it should implement the following methods: `error`, `warn`, `log`, `info`, `debug`
<br/> ℹ️ info
<br/> 💡 example: console
➖ **logger** ( String ) `✏️ Steps`
<br/> 📝 The title of the trace
<br/> ℹ️ It will appear at the top of the output
<br/> 💡 example: 'AUTH-FLOW'
➖ **logger** ( Number ) `✏️ 30`
<br/> 📝 Timeout before triggering an automatic flush
<br/> ❗️ Setting a big timeout could lead to higher memmory usage in case you forget to flush often
<br/> ℹ️ info:
<br/> 💡 example: 15

### methods

#### #name

```js
stepsLogger

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/danielo515/steps-logger) example.

### Builds

If you don't use a package manager, you can [access `steps-logger` via unpkg (CDN)](https://unpkg.com/steps-logger/), download the source, or point your package manager to the url.

`steps-logger` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `steps-logger` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/steps-logger/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/steps-logger) on your page. The UMD builds make `steps-logger` available as a `window.stepsLogger` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
