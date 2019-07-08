const parser = require('../pageParser');

parser.categoryPage('http://paper.people.com.cn/rmrb/html/2019-07/08/nbs.D110000renmrb_01.htm').then(list => {
  console.log(list);
});