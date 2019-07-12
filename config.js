function dateOrToday(dateString) {
  return dateString ? new Date(dateString) : new Date();
}

const config = {
  endDate: '', // 截止日期，可填写格式：yyyy-mm-dd 或不填写（即今天）
  days: 30, // 回溯天数
};

config.endDate = dateOrToday(config.endDate);

module.exports = config;