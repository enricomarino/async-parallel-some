/**!
 * async-parallel-some
 * async parallel some
 *
 * @copyright 2013 Enrico Marino
 * @license MIT
 */

/**
 * Test if at least one item in the array pass 'iterator' async test
 *
 * @param {Array} array array
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */
 
module.exports = function (array, iterator, callback) {
  var completed = 0;
  var len = array.length;
  var i;

  function complete(err, result) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    if (result) {
      callback(err, true);
      callback = function () {};
      return;
    }
    completed += 1;
    if (completed === len) {
      callback(err, false);
      return;
    }
  }

  for (i = 0; i < len; i += 1) {
    iterator(array[i], complete);
  }
};
