const path = require('path');
const assert = require('power-assert');
const reader = require('../index.js');

describe('bmp-size-reader test', () => {
  const testDir = path.join(__dirname, 'test_images');
  const testFile1 = path.join(testDir, 'bmp_image1.bmp');
  it('test1', (done) => {
    reader(testFile1).then((result) => {
      assert(result.toString() === [1000, 1000].toString());
      done();
    });
  });
});