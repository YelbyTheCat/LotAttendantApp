/**
 * Convert label into camel cased property name
 * @param {string} text 
 * @return {string} camelCase
 */
const formatProperty = text => {
  return _.camelCase(text);
};

module.exports = {
  formatProperty,
};
