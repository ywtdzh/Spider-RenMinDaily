const events = require('events');

class PendingQueue {
  constructor(capacity) {
    this.capacity = this.maximum = capacity;
    this.generators = [];
    this.eventDriver = new events.EventEmitter();
    this.eventDriver.on('idle', () => {
      for (; this.capacity > 0; this.capacity--) {
        if (this.generators.length)
          this.load();
        else break;
      }
    });
  }

  load() {
    const promiseGenerator = this.generators.shift();
    promiseGenerator()
      .catch(console.error)
      .finally(() => {
        this.capacity++;
        if (this.maximum === this.capacity) {
          console.log('全部任务已完成');
          process.exit(0);
        }
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