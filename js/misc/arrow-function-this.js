'use strict';

const arrow = () => {
  console.log(this.firstName);
};

const user = {
  firstName: 'Bob',
  sayHi() {
    const outerFn = arrow;
    outerFn();

    const innerFn = () => {
      console.log(this.firstName);
    };
    innerFn()
  }
};

user.sayHi();
