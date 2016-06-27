var PubnubEvents = require('../lib/index');
var mockery = require('mockery');
var sinon = require('sinon');
var should = require('chai').should();

var eventName = 'something';
var eventData = 'something_data';
var channel = 'button1';
var device = 'board';
var publishKey = 'pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99';
var subscribeKey = 'sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f';

describe('puhnub-events', function () {
  var pubNubStub;
  var publishStub;
  beforeEach(function () {
    pubNubStub = sinon.stub();
    publishStub = sinon.stub();
    mockery.enable();
    mockery.registerMock('pubnub', pubNubStub);
    pubNubStub.onFirstCall().returns({
      publish: publishStub
    });
  });

  afterEach(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('should send pubnub when events are triggered', function () {
    var myEventEmitter = new PubnubEvents({
      publish_key: publishKey,
      subscribe_key: subscribeKey,
      channel: channel,
      device: device
    });
    pubNubStub.called.should.be.equal(true);
    pubNubStub.getCall(0).args[0].ssl.should.be.equal(true);
    pubNubStub.getCall(0).args[0].publish_key.should.be.equal('pub-c-8e6ce779-896f-4c35-a786-46ad43d20e99');
    pubNubStub.getCall(0).args[0].subscribe_key.should.be.equal('sub-c-21ad773a-35cb-11e6-ac64-0619f8945a4f');

    myEventEmitter.on(eventName, function () {
      publishStub.called.should.be.equal(true);
      publishStub.getCall(0).args[0].channel.should.be.equal(channel);
      publishStub.getCall(0).args[0].device.should.be.equal(device);
      publishStub.getCall(0).args[0].message.should.be.deep.equal({type: eventName, data: eventData});
    });

    myEventEmitter.emit(eventName, eventData);
  });

  it('should NOT send pubnub when events are triggered but is muted', function () {
    var myEventEmitter = new PubnubEvents({
      publish_key: publishKey,
      subscribe_key: subscribeKey,
      channel: channel,
      device: device
    });

    myEventEmitter.on(eventName, function () {
      publishStub.called.should.be.equal(false);
    });

    myEventEmitter.mutePubNub();
    myEventEmitter.emit(eventName, eventData);
  });

  it('should send pubnub when events are triggered and it was un-muted', function () {
    var myEventEmitter = new PubnubEvents({
      publish_key: publishKey,
      subscribe_key: subscribeKey,
      channel: channel,
      device: device
    });

    myEventEmitter.on(eventName, function () {
      publishStub.called.should.be.equal(true);
    });

    myEventEmitter.unMutePubNub();
    myEventEmitter.emit(eventName, eventData);
  });
});
