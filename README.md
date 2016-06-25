# pubnub-events [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Send PubNub messages on NodeJS events.

This module provides an alternative EventEmitter (default in NodeJS) that sends

## Installation

```sh
$ npm install --save pubnub-events
```

## Usage

```js
var PubNubEvents = require('pubnub-events');

var myEventEmitter = new PubNubEvents({
    publish_key: 'pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99',
    subscribe_key: 'sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f',
    channel: 'button1',
    device: 'edison'
  });
  

  myEventEmitter.on('something', function () {
      console.log('should have emmited something');
  });

  myEventEmitter.emit('something', 'another thing'); --> this will trigger the pubnub event

  myEventEmitter.mutePubNub();
  
  myEventEmitter.emit('something', 'another thing'); --> this will NOT trigger the pubnub event

```
## License

MIT © [Diego Pamio](http://github.com/diegopamio)


[npm-image]: https://badge.fury.io/js/pubnub-events.svg
[npm-url]: https://npmjs.org/package/pubnub-events
[travis-image]: https://travis-ci.org/diegopamio/pubnub-events.svg?branch=master
[travis-url]: https://travis-ci.org/diegopamio/pubnub-events
[daviddm-image]: https://david-dm.org/diegopamio/pubnub-events.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/diegopamio/pubnub-events
[coveralls-image]: https://coveralls.io/repos/diegopamio/pubnub-events/badge.svg
[coveralls-url]: https://coveralls.io/r/diegopamio/pubnub-events
