const parser = require('../utils/pageParser');

parser.contentPage('http://paper.people.com.cn/rmrb/html/2019-07/08/nw.D110000renmrb_20190708_2-01.htm').then(content => {
  console.log(content);
});