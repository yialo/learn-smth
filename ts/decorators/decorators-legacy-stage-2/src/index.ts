import 'reflect-metadata';

function itself(constructor: Function) {
  console.log('itself(): called, constructor name:', constructor.name);
}

/*
@itself
class ExampleWithClassItself {}
*/

function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(
      'first(): called,',
      JSON.stringify({ target, propertyKey, descriptor }, null, 2),
    );
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(
      'second(): called,',
      JSON.stringify({ target, propertyKey, descriptor }, null, 2),
    );
  };
}

/* class ExampleWithMethod {
  @first()
  @second()
  myMethod() {}
} */

function decorateAccessor(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log(
    'decorateAccessor(): called,',
    JSON.stringify(
      {
        target,
        propertyKey,
        descriptor,
        hasGetter: typeof descriptor.get === 'function',
        hasSetter: typeof descriptor.set === 'function',
      },
      null,
      2,
    ),
  );
}

/* class ExampleWithAccessor {
  get myAccessor() {
    return 'myAccessor value';
  }

  @decorateAccessor
  set myAccessor(value: string) {
    console.log('myAccessor set to:', value);
  }
} */

const formatMetadataKey = Symbol('format');

function format(template: string) {
  return Reflect.metadata(formatMetadataKey, template);
}

function getFormatTemplate(target: object, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

/* class GreeterViaProperty {
  @format('Hello, %s!')
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    const formatTemplate = getFormatTemplate(this, 'greeting');
    return formatTemplate.replace('%s', this.greeting);
  }
}
const greeter = new GreeterViaProperty('World');
console.log(greeter.greet()); */

function decorateConstructorParameter(
  target: any,
  _propertyKey: undefined,
  parameterIndex: number,
) {
  console.log(
    `decorateConstructorParameter(): called on ${target.name} at index ${parameterIndex}`,
  );
}

function decorateInstanceMethodParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number,
) {
  console.log(
    `decorateInstanceMethodParameter(): called on ${target.constructor.name}.['${propertyKey}'] at index ${parameterIndex}`,
  );
}

class ExampleWithParameter {
  #internalValue: string;

  constructor(@decorateConstructorParameter value: string) {
    this.#internalValue = value;
  }

  showWithPrefix(@decorateInstanceMethodParameter prefix: string): string {
    return prefix + this.#internalValue;
  }
}
