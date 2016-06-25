var EventEmitter = require('events').EventEmitter;

class PubNubEvent extends EventEmitter {
  constructor(cfg) {
    super();
    this.pubnub = require('pubnub')({
      ssl: true,
      publish_key: cfg.publish_key,
      subscribe_key: cfg.subscribe_key
    });
    this.channel = cfg.channel;
    this.device = cfg.device;
    this.config = cfg;
    this.muted = cfg.muted || false;
  }
  emit(type, data) {
    if (!this.muted) {
      this.pubnub.publish({
        channel: this.channel,
        device: this.device,
        message: {type: type, data: data}
      });
    }
    super.emit(type);
  }
  mutePubNub() {
    this.muted = true;
  }
  unMutePubNub() {
    this.muted = false;
  }
}

module.exports = PubNubEvent;
