import * as React from 'react';

const renderingDurationMs = 250;

export const HeavyThing: React.FC<{ text: string }> = ({ text }) => {
  console.log('[render] HeavyThing');

  const startingMomentMs = performance.now();

  React.useEffect(() => {
    console.log('[render completed] HeavyThing');
  }, []);

  while (true) {
    if (performance.now() - startingMomentMs > renderingDurationMs) {
      break;
    }
  }

  return (
    <div
      style={{
        color: 'white',
        fontSize: '3em',
        backgroundColor: 'red',
        padding: '4px 8px',
      }}
    >
      <div>Heavy thing!</div>
      {text}
    </div>
  );
};
