'use strict';

// This is a custom Jest transformer turning style imports into empty objects.

module.exports = {
  process() {
    return 'module.exports = {};';
  }
};
