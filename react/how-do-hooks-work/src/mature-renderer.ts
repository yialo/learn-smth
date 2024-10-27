(() => {
  const makeRenderer = () => {
    let hooks = [];
    let currentHookIndex = 0;

    return {
      render(ComponentFactory) {
        const Component = ComponentFactory();
        Component.render();
        currentHookIndex = 0;
        return Component;
      },

      useState<State>(initialState: State) {
        hooks[currentHookIndex] = hooks[currentHookIndex] ?? initialState;

        // Avoid setState closing-over mutable currentHookIndex
        const stateSetterHookIndex = currentHookIndex;

        const setState = (newState: State) => {
          hooks[stateSetterHookIndex] = newState;
        };

        const result = [hooks[currentHookIndex], setState] as const;
        currentHookIndex++;
        return result;
      },

      useEffect(callback: () => void, newDeps?: any[]) {
        const deps = hooks[currentHookIndex];

        const hasChangedDeps =
          deps && newDeps ? newDeps.some((el, i) => el !== deps[i]) : true;

        if (hasChangedDeps) {
          callback();
          hooks[currentHookIndex] = newDeps;
        }

        currentHookIndex++;
      },

      useRef<Value>(value: Value) {
        return Renderer.useState<{ current: Value }>({
          current: value,
        })[0];
      },
    };
  };

  const Renderer = makeRenderer();

  const useUrlSplitter = (url: string) => {
    Renderer.useEffect(() => {
      console.log('splitter effect:', url.split('.'));
    }, [url]);
  };

  const Counter = () => {
    const [firstCount, setFirstCount] = Renderer.useState(0);
    const [secondCount, setSecondCount] = Renderer.useState(0);

    Renderer.useEffect(() => {
      console.log('effect with deps', { firstCount, secondCount });
    }, [firstCount, secondCount]);

    useUrlSplitter('www.example.com');

    Renderer.useEffect(() => {
      console.log('effect without deps');
    });

    const textRef = Renderer.useRef('text');

    return {
      increment() {
        setFirstCount(firstCount + 1);
        setSecondCount(secondCount + 2);
      },
      noop() {
        setFirstCount(firstCount);
        setSecondCount(secondCount);
      },
      render() {
        console.log('rendered:', {
          firstCount,
          secondCount,
          'textRef.current': textRef.current,
        });
      },
    };
  };

  let App;

  const reRender = () => {
    App = Renderer.render(Counter);
  };

  console.log('--- initial render ---');
  reRender();

  console.log('--- render on increment ---');
  App.increment();
  reRender();

  console.log('--- render on noop ---');
  App.noop();
  reRender();

  console.log('--- render on increment ---');
  App.increment();
  reRender();
})();
