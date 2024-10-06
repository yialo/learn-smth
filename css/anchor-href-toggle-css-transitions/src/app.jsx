import * as React from "react";

export function App() {
  const [isLink, setIsLink] = React.useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsLink((prev) => !prev);
        }}
      >
        Toggle link
      </button>
      <h1>Hello StackBlitz!</h1>
      <a className="link" href={isLink ? "#" : undefined}>
        Link
      </a>
    </div>
  );
}
