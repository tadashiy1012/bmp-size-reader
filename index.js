module.exports = (function () {
  const fs = require('fs');

  const BMP_SIGNATURE = [0x42, 0x4d];

  function getHexStr(bary) {
    let line = '';
    for (let i = 0; i < bary.length; i++) {
      const s = bary[i].toString(16);
      if (s.length < 2) {
        line += ('0' + s);
      } else {
        line += s;
      }
    }
    return line;
  }

  function readBuf(tgtImagePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(tgtImagePath, (err, data) => {
        if (err) { reject(err); }
        else { resolve(new Uint8Array(data)); }
      });
    });
  }

  function comp(intary, hexary) {
    return intary.toString() === hexary.toString();
  }

  function check(bary) {
    const target = bary.subarray(0, 2);
    return comp(target, BMP_SIGNATURE);
  }

  function getSize(bary) {
    const bw = bary.subarray(18, 22);
    const bh = bary.subarray(22, 26);
    const hw = getHexStr(bw.reverse());
    const hh = getHexStr(bh.reverse());
    return [parseInt(hw, 16), parseInt(hh, 16)];
  }

  return function bmpSizeReader(tgtFilePath) {
    return new Promise((resolve, reject) => {
      readBuf(tgtFilePath).then((resp) => {
        if (check(resp)) {
          resolve(getSize(resp));
        } else {
          reject(new Error('Unsupported file type'));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  };
})();