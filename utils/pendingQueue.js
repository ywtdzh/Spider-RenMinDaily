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
      .catch((e) => {
        if (e.config && e.config.url)
          console.log(`解析${e.config.url}失败`);
        else console.error(e);
      })
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