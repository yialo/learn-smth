function createDecorator(place: string) {
  return function decorator(...args: any[]) {
    console.log(`[decorator call] (${place}):`, args);
  };
}

@createDecorator('class')
class MyClass {
  set a(value: any) {}

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
