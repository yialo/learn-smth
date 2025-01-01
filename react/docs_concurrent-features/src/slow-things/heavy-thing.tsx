import * as React from 'react';

import { slowdown } from './slowdown';

const showHugeList = true;

export const HeavyThing: React.FC<{ text: string }> = React.memo(({ text }) => {
  console.log('[render] HeavyThing');

  React.useEffect(() => {
    console.log('[render complete] HeavyThing');
  });

  return (
    <div>
      <div
        style={{
          color: 'red',
          fontSize: '3em',
          border: '1px solid red',
          padding: '4px 8px',
        }}
      >
        Heavy thing!
      </div>
      {showHugeList ? <HugeList text={text} /> : <LaggyDiv text={text} />}
    </div>
  );
});
HeavyThing.displayName = 'memo(HeavyThing)';

const HugeList: React.FC<{ text: string }> = ({ text }) => {
  return (
    <ul>
      {Array.from({ length: 10000 }).map((_, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
};

const LaggyDiv: React.FC<{ text: string }> = ({ text }) => {
  slowdown(1000);

  return <div>{text}</div>;
};
