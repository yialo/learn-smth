function createDecorator(place) {
  return function decorator(...args) {
    console.log(`[decorator call] (${place}):`, args);
  };
}

console.log('=== START ===');

@createDecorator('class')
class MyClass {
  set a(value) {}

  @createDecorator('property')
  p = 1;

  @createDecorator('static method')
  static sm() {}

  @createDecorator('method')
  m() {}

  @createDecorator('getter')
  get a() {
    return 'a value';
  }
}
