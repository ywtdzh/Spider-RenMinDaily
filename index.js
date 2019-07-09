const PendingQueue = require('./pendingQueue');
const PageParsers = require('./pageParser');
const UrlGenerator = require('./urlGenerator');
const fileWriter = require('./fileWriter');
const config = require('./config');

const pendingQueue = new PendingQueue(10), {endDate} = config;
let daysLeft = config.days;

function categoryPromiseGenerator(url, date) {
  return async function () {
    let contentPages = await PageParsers.categoryPage(url);
    contentPages = contentPages.map(suffix => UrlGenerator.prefix(date) + suffix);
    pendingQueue.add(...contentPages.map((url) => contentPromiseGenerator(url, date)));
  };
}

function contentPromiseGenerator(url, date) {
  return async function () {
    const {title, content} = await PageParsers.contentPage(url);
    await fileWriter(date, title, content);
  };
}

function mainDriver(date) {
  pendingQueue.add(async function () {
    let categoryPages = await PageParsers.mainPage(UrlGenerator.mainPage(date));
    categoryPages = categoryPages.map(suffix => UrlGenerator.prefix(date) + suffix);
    pendingQueue.add(...categoryPages.map((url) => categoryPromiseGenerator(url, date)));
  });
  if (daysLeft-- <= 0) return;
  mainDriver(new Date(date - 24 * 60 * 60 * 1000));
}

mainDriver(endDate);
pendingQueue.start();
