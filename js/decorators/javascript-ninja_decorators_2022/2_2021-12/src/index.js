function createDecorator(place) {
  return function decorator(...args) {
    console.log(`[decorator call] (${place}):`, args);
  };
}

console.log('=== START ===');

@createDecorator('class')
class MyClass {
  @createDecorator('instance property')
  instanceProperty = 1;

  @createDecorator('static method')
  static staticMethod() {}

  @createDecorator('instance method')
  instanceMethod() {}

  set accessedInstanceValue(value) {}

  @createDecorator('instance getter')
  get accessedInstanceValue() {
    return 'a value';
  }
}
