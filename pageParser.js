const cheerio = require('cheerio');
const request = require('axios');
const os = require('os');

async function loadPage(url) {
  const response = await request.get(url);
  return cheerio.load(response.data);
}

async function mainPage(mainPageUrl) {
  console.log('正在解析主页面: ' + mainPageUrl);
  const $ = await loadPage(mainPageUrl);
  return Array.from($('.list_r .l_c ul div.right_title-name a'))
    .map(htmlElement => htmlElement.attribs.href.replace('./', ''));
}

async function categoryPage(categoryUrl) {
  console.log('正在解析目录: ' + categoryUrl);
  const $ = await loadPage(categoryUrl);
  return Array.from($('#titleList ul li a'))
    .map(htmlElement => htmlElement.attribs.href.replace('./', ''));
}

async function contentPage(contentUrl) {
  console.log('正在解析内容: ' + contentUrl);
  const $ = await loadPage(contentUrl);
  const h1 = $('.text_c h1')[0].children, h2 = $('.text_c h2')[0].children;
  const title = `${h1.length ? h1[0].data : ''}${h2.length ? ' ' + h2[0].data : ''}`;
  const content = Array.from($('#ozoom p'))
    .map(htmlElement => htmlElement.children.length ? htmlElement.children[0].data : '')
    .join(os.EOL);
  return {title, content};
}

module.exports = {
  mainPage,
  categoryPage,
  contentPage,
};