import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);
  const [parentState, setParentState] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '1rem',
        padding: '2rem',
      }}
    >
      <div style={{ display: 'flex', columnGap: '1rem' }}>
        <button type="button" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button type="button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
      <CountLabel
        count={count}
        incrementParentState={() => {
          setParentState((prev) => ++prev);
        }}
      />
      <div>Parent state: {parentState}</div>
    </div>
  );
}

function CountLabel({
  count,
  incrementParentState,
}: {
  count: number;
  incrementParentState: () => void;
}) {
  console.log('[CountLabel] === render started ===');

  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState<string | undefined>(undefined);

  /* @NOTE:
    We need TWO separate state variables because
    - One of them is responsible only for conditional check and finally is aligned with controlling value (prop, another state) - `prevCount` in our case;
    - the second one is actually used for tracking something used in render output - `trend` in our case.
   */
  if (prevCount !== count) {
    console.log('[CountLabel] conditional setState()');

    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');

    // @NOTE: this call will lead to error, check console
    // incrementParentState();
  }

  console.log('[CountLabel] AFTER conditional setState()');

  return (
    <>
      <h1>{count}</h1>
      {(() => {
        console.log('[CountLabel] inside JSX');
      })()}
      {trend && <p>The count is {trend}</p>}
      <Child />
      <button type="button" onClick={incrementParentState}>
        Increment parent state
      </button>
    </>
  );
}

const Child: React.FC = () => {
  console.log('%c[Child] render', 'color: lime;');

  return <div>This is a child component</div>;
};
