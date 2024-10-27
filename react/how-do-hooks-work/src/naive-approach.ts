(() => {
  const useState = <State>(initialState: State) => {
    let _state = initialState;

    const getState = () => {
      return _state;
    };

    const setState = (newState: State) => {
      _state = newState;
    };

    return [getState, setState] as const;
  };

  const Counter = () => {
    const [getCount, setCount] = useState(0);

    return {
      click: () => {
        setCount(getCount() + 1);
      },
      render: () => {
        console.log('render:', { count: getCount() });
      },
    };
  };

  const counter = Counter();

  counter.render();

  counter.click();
  counter.render();
})();
