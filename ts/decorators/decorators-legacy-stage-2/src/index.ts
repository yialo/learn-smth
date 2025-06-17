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
  test = 'test';
  // Can't use method decorators on functional properties
  myFunctionalProperty = (value: string) => this.test + '_' + value;

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

/* class ExampleWithParameter {
  #internalValue: string;
  // Can't apply parameter decorators to functional properties
  showWithSuffix = (suffix: string): string => this.#internalValue + suffix;

  constructor(@decorateConstructorParameter value: string) {
    this.#internalValue = value;
  }

  showWithPrefix(@decorateInstanceMethodParameter prefix: string): string {
    return prefix + this.#internalValue;
  }
} */

const requiredParamsMetadataKey = Symbol('requiredParams');

const required = (
  target: object,
  propertyKey: string,
  parameterIndex: number,
) => {
  const registeredRequiredParamIndices =
    Reflect.getOwnMetadata(requiredParamsMetadataKey, target, propertyKey) ??
    [];
  registeredRequiredParamIndices.push(parameterIndex);

  Reflect.defineMetadata(
    requiredParamsMetadataKey,
    registeredRequiredParamIndices,
    target,
    propertyKey,
  );
};

const validate = (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const unboundMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const requiredParamIndices = Reflect.getOwnMetadata(
      requiredParamsMetadataKey,
      target,
      propertyKey,
    );

    for (const requiredParamIndex of requiredParamIndices) {
      if (
        requiredParamIndex >= args.length ||
        args[requiredParamIndex] === undefined
      ) {
        throw new Error('Missing required parameter.');
      }
    }

    return unboundMethod.apply(this, args);
  };
};

/* class BugReport {
  type = 'report';
  title: string;

  constructor() {
    this.title = 'Bug Report';
  }

  @validate
  report(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
      return this.title;
    }
  }
}

const bugReport = new BugReport();
console.log(bugReport.report(true)); */

const instanceMetadataKey = Symbol('design:type');

const validateInstance = <T>(
  target: object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
) => {
  const setter = descriptor.set!;

  descriptor.set = function (value: T) {
    const type = Reflect.getMetadata(instanceMetadataKey, target, propertyKey);

    if (!(value instanceof type)) {
      throw new TypeError(
        `Invalid type, got ${typeof value} not ${type.name}.`,
      );
    }

    return setter.call(this, value);
  };
};

class Point {
  constructor(public x: number, public y: number) {}
}

class Line {
  private _start: Point | undefined;
  private _end: Point | undefined;

  @Reflect.metadata(instanceMetadataKey, Point)
  @validateInstance
  set start(value: Point) {
    this._start = value;
  }

  get start() {
    // @ts-ignore
    return this._start;
  }

  @Reflect.metadata(instanceMetadataKey, Point)
  @validateInstance
  set end(value: Point) {
    this._end = value;
  }

  get end() {
    // @ts-ignore
    return this._end;
  }
}

const line = new Line();
line.start = new Point(1, -1);
// @ts-ignore, but caught in runtime
line.end = {};
