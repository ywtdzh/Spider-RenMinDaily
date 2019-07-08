function prefixDate(number, digit) {
  const numString = 0..toFixed(digit) + number.toString();
  return numString.substring(numString.length - digit, numString.length);
}

Date.prototype.toCustomString = function () {
  return `${this.getFullYear()}-${prefixDate(this.getMonth() + 1, 2)}-${prefixDate(this.getDate(), 2)}`;
};

const prefix = date => 'http://paper.people.com.cn/rmrb/html/' +
  `${date.getFullYear()}-${prefixDate(date.getMonth() + 1, 2)}/${prefixDate(date.getDate(), 2)}/`;

module.exports = {
  mainPage: date => prefix(date) + 'nbs.D110000renmrb_01.htm',
  prefix,
  prefixDate,
};