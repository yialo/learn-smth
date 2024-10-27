(() => {
  const makeRenderer = <State>() => {
    let _state: State;
    let _deps: any[];

    return {
      render(ComponentFactory) {
        const Component = ComponentFactory();
        Component.render();
        return Component;
      },
      useState(initialState: State) {
        _state = _state ?? initialState;

        const setState = (newState: State) => {
          _state = newState;
        };

        return [_state, setState] as const;
      },
      useEffect(callback: () => void, newDeps?: any[]) {
        const hasChangedDeps =
          _deps && newDeps ? newDeps.some((el, i) => el !== _deps[i]) : true;

        if (hasChangedDeps) {
          callback();
          _deps = newDeps;
        }
      },
    };
  };

  const Renderer = makeRenderer<number>();

  const Counter = () => {
    const [count, setCount] = Renderer.useState(0);

    Renderer.useEffect(() => {
      console.log('effect', count);
    }, [count]);

    return {
      increment() {
        setCount(count + 1);
      },
      noop() {
        setCount(count);
      },
      render() {
        console.log('render:', { count: count });
      },
    };
  };

  let App;

  const reRender = (loggerMessage?: string) => {
    if (loggerMessage) {
      console.log(loggerMessage);
    }

    App = Renderer.render(Counter);
  };

  reRender('--- initial render');

  App.increment();
  reRender('--- render on increment');

  App.noop();
  reRender('--- render on noop');

  App.increment();
  reRender('--- render on increment');
})();
