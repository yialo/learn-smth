'use strict';

let method;

const obj = {
  go: function () {
    console.log(this);
  }
};

obj.go();
(obj.go)();
(method = obj.go)();
(obj.go || obj.stop)();
