import * as React from 'react';

import { slowdown } from './slowdown';

export const SlowList = React.memo(function SlowList({
  text,
}: {
  text: string;
}) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <div>
      <div>SlowList</div>
      <ul className="items">{items}</ul>
    </div>
  );
});

function SlowItem({ text }: { text: string }) {
  slowdown(1);

  return <li className="item">Text: {text}</li>;
}
