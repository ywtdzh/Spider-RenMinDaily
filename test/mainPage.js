const parser = require('../utils/pageParser');
const UrlGenerator = require('../utils/urlGenerator');

parser.mainPage(UrlGenerator.mainPage(new Date())).then(list => {
  console.log(list);
});