const fsPromises = require('fs').promises;
const os = require('os');

const init = fsPromises.mkdir('./output')
  .then(() => {
    console.log('已创建输出文件夹./output...');
  }).catch(e => {
    if (e.code.toUpperCase() === 'EEXIST')
      console.log('将以已存在的./output文件夹为输出文件夹...');
    else console.error(e);
  });

module.exports = async function (date, title, content) {
  await init;
  const dateString = date.toCustomString();
  return await fsPromises.writeFile(`./output/${dateString}_${title}.txt`, title + os.EOL + content)
    .catch(console.error);
};