import assert from 'assert';
//import PubNubEvents from '../lib';
var pubnubEvents = require('../lib/index');

describe('puhnub-events', function () {
  it('should send pubnub when events are triggered', function () {
    var myEventEmitter = new pubnubEvents({
      publish_key: 'pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99',
      subscribe_key: 'sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f',
      channel: 'button1',
      device: 'board'
    });

    myEventEmitter.on('something', function () {
      console.log('should have emmited something');
    });

    myEventEmitter.emit('something', 'another thing');
  });

  it('should NOT send pubnub when events are triggered but is muted', function () {
    var myEventEmitter = new pubnubEvents({
      publish_key: 'pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99',
      subscribe_key: 'sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f',
      channel: 'button1',
      device: 'board'
    });

    myEventEmitter.on('something', function () {
      console.log('should have emmited something');
    });

    myEventEmitter.mutePubNub();
    myEventEmitter.emit('something', 'another thing');
  });

  it('should send pubnub when events are triggered and it was un-muted', function () {
    var myEventEmitter = new pubnubEvents({
      publish_key: 'pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99',
      subscribe_key: 'sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f',
      channel: 'button1',
      device: 'board',
      muted: true
    });

    myEventEmitter.on('something', function () {
      console.log('should have emmited something');
    });

    myEventEmitter.unMutePubNub();
    myEventEmitter.emit('something', 'another thing');
  });

});
