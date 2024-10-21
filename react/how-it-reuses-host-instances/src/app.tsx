import * as React from 'react';

import './style.css';

type TChildProps = {
  text: React.ReactElement;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const staticTextElement: React.ReactElement = <p>Static text</p>;

const Text: React.FC = () => {
  React.useEffect(() => {
    console.log('-- RERENDER: Text component');
  });

  return <p>Static component with text</p>;
};

const ChildA: React.FC<TChildProps> = ({ value, onChange, text }) => (
  <div>
    <input type="text" value={value} onChange={onChange} />
    <p>Child A</p>
    {staticTextElement}
    {text}
  </div>
);

const ChildB: React.FC<TChildProps> = ({ value, onChange, text }) => (
  <div>
    <input type="text" value={value} onChange={onChange} />
    <p>Child B</p>
    {staticTextElement}
    {text}
  </div>
);

const textComponentElement = <Text />;

type TAppProps = {
  text: React.ReactElement;
};

export const App: React.FC<TAppProps> = ({ text }) => {
  const [hasText, setHasText] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('bob');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      {/* {hasText && <p>Start editing to see some magic happen :)</p>}
      <input type="text" /> */}

      {/* {hasText ? (
        <React.Fragment>
          <p>Start editing to see some magic happen :)</p>
          <input type="text" />
        </React.Fragment>
      ) : (
        <input type="text" />
      )} */}

      {/* {hasText ? (
        <ChildA
          text={textComponentElement}
          value={inputValue}
          onChange={handleChange}
        />
      ) : (
        <ChildB
          text={textComponentElement}
          value={inputValue}
          onChange={handleChange}
        />
      )} */}

      {text}

      <p>{`hasText: ${hasText}`}</p>

      <p className="animated" key={Number(hasText)}>
        Text with key
      </p>

      <p className="animated">Text without key</p>

      {hasText ? (
        <p className="animated">Text without key in fragment</p>
      ) : (
        <>
          <p className="animated">Text without key in fragment</p>
        </>
      )}

      <button
        type="button"
        onClick={() => {
          setHasText((prev) => !prev);
        }}
      >
        Click
      </button>
    </div>
  );
};