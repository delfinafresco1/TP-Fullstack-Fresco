function generateReadableId(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${randomPart}`;
}

module.exports = {
  generateReadableId,
};
