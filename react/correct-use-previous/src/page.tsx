import * as React from 'react';

import { usePreviousPersistent, usePreviousStandard } from './use-previous';

const PRICES = [100, 200, 300, 400, 500, 600, 700];

export const Page = () => {
  'use no memo';

  console.log('[Page] === render started ===');

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(100);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        rowGap: '0.5rem',
        padding: '1rem',
      }}
    >
      Type your name here:{' '}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Select price here:{' '}
      <select value={price} onChange={(e) => setPrice(Number(e.target.value))}>
        {PRICES.map((price) => (
          <option key={price} value={price}>
            {price}$
          </option>
        ))}
      </select>
      <br />
      <h4>Standard hook</h4>
      <PriceWithStandard price={price} />
      <h4>Persistent hook</h4>
      <PriceWithPersistent price={price} />
    </div>
  );
};

const PriceWithPersistent: React.FC<{ price: number }> = ({ price }) => {
  const prevPrice = usePreviousPersistent(price);

  console.log('[PriceWithPersistent] prevPrice', prevPrice);

  const icon = prevPrice && prevPrice < price ? '😡' : '😊';

  return (
    <div>
      Current price: {price}; <br />
      Previous price: {prevPrice} {icon}
    </div>
  );
};

const PriceWithStandard: React.FC<{ price: number }> = ({ price }) => {
  const prevPrice = usePreviousStandard(price);

  console.log('[PriceWithStandard] prevPrice', prevPrice);

  const icon = prevPrice && prevPrice < price ? '😡' : '😊';

  return (
    <div>
      Current price: {price}; <br />
      Previous price: {prevPrice} {icon}
    </div>
  );
};
