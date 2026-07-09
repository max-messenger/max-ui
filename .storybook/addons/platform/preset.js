// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function config (entry = []) {
  return [...entry, require.resolve('./register')];
}

module.exports = { managerEntries: config };
