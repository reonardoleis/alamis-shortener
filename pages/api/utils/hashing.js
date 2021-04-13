const CRC32 = require('crc-32');

const hashUrl = async (url) => {
  let hash = CRC32.str(url + (+ (new Date())));
  hash = hash > 0 ? hash : -hash;
  hash = hash.toString(16);
  return hash;
}

module.exports = { hashUrl };