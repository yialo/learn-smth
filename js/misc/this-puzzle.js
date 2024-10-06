// 'use strict';

const guitarStore = function () {
  this.guitarCount = 2;

  (function () {
    this.guitarCount = 1;
  }());

  console.log(this.guitarCount);
};

const guitarShop = {
  guitarCount: 3,
  showMeAnswer() {
    console.log(this.guitarCount);
  },
};

guitarStore();
new guitarStore();
guitarShop.showMeAnswer();
new guitarShop.showMeAnswer();
guitarStore.apply(guitarStore);
guitarShop.showMeAnswer.apply(guitarStore);
guitarStore.bind({})();
