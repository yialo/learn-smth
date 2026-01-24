import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const StatefulChildA: React.FC<{ slot: React.ReactElement }> = ({ slot }) => {
  const [hasText, setHasText] = React.useState(true);

  return (
    <div>
      <div
        className="animated"
        key={Number(hasText)}
        style={{ marginBlockEnd: '2rem' }}
      >
        Element rendered inside Child A
      </div>

      <div style={{ marginBlockEnd: '2rem' }}>{slot}</div>

      <div style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => {
            setHasText((prev) => !prev);
          }}
        >
          Rerender Child A
        </button>
        <p>{`[Stateful Child A] hasText: ${hasText}`}</p>
      </div>
    </div>
  );
};

const StatefulChildB: React.FC<{ slot: React.ReactElement }> = ({ slot }) => {
  const [hasText, setHasText] = React.useState(true);

  return (
    <div>
      <div
        className="animated"
        key={Number(hasText)}
        style={{ marginBlockEnd: '2rem' }}
      >
        Element rendered inside Child B
      </div>

      <div style={{ marginBlockEnd: '2rem' }}>{slot}</div>

      <div style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => {
            setHasText((prev) => !prev);
          }}
        >
          Rerender Child B
        </button>
        <p>{`[Stateful Child B] hasText: ${hasText}`}</p>
      </div>
    </div>
  );
};

// Case: static slotContent
const slotContent = (
  <div className="animated">Element passed to Child slot</div>
);

const App: React.FC = () => {
  const [hasText, setHasText] = React.useState(true);

  // Case: slotContent without key
  /* const slotContent = (
    <div className="animated">Element passed to Child slot</div>
  ); */

  // Case: slotContent with key
  /* const slotContent = (
    <div className="animated" key={Number(hasText)}>
      Element passed to Child slot
    </div>
  ); */

  return (
    <div>
      {/* Case: Child A/B swap */}
      {/* {hasText ? (
        <StatefulChildA slot={slotContent} />
      ) : (
        <StatefulChildB slot={slotContent} />
      )} */}

      {/* Case: single Child without key */}
      {/* <StatefulChildA slot={slotContent} /> */}

      {/* Case: single Child with key */}
      <StatefulChildA slot={slotContent} key={Number(hasText)} />

      <div style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => {
            setHasText((prev) => !prev);
          }}
        >
          Rerender App
        </button>
        <p>{`[App] hasText: ${hasText}`}</p>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
