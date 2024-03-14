/**
 * 获取当前年份
 * @returns {string} year
 */
const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export default getYear;
