const events = require('events');

class PendingQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.generators = [];
    this.eventDriver = new events.EventEmitter();
    this.eventDriver.on('idle', () => {
      for (; this.capacity > 0; this.capacity--) {
        if (this.generators.length)
          this.load();
      }
    });
  }

  load() {
    if (this.generators.length === 0 && this.capacity) {
      console.log('全部任务已完成');
      process.exit(0);
    }
    const promiseGenerator = this.generators.shift();
    promiseGenerator()
      .catch(console.error)
      .finally(() => {
        this.capacity++;
        this.eventDriver.emit('idle');
      });
  }

  add(...promiseGenerator) {
    this.generators.push(...promiseGenerator);
  }

  start() {
    this.eventDriver.emit('idle');
  }
}

module.exports = PendingQueue;