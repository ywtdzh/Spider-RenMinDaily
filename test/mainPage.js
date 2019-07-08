const parser = require('../pageParser');
const UrlGenerator = require('../urlGenerator');

parser.mainPage(UrlGenerator.mainPage(new Date())).then(list => {
  console.log(list);
});