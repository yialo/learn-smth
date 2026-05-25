import { escapeRegExp } from 'lodash-es';
import * as React from 'react';

export function App() {
  const originalText = 'foo bar baz barbar';

  return (
    <div className="App">
      <div>
        <div>Original:</div>
        {originalText}
      </div>
      <div>
        <div>Replaced:</div>
        <Replacer
          text={originalText}
          replaces={[
            ['bar', <b>bar</b>],
            [/baz/, <i>baz</i>],
          ]}
        />
      </div>
      <hr />
      <div>Expected:</div>
      <div>
        foo <b>bar</b> <i>baz</i> <b>barbar</b>
      </div>
    </div>
  );
}

export type ReplaceParams = [string | RegExp, React.ReactNode];

export interface Props {
  text: string;
  replaces?: ReplaceParams[];
}

class Replacer extends React.PureComponent<Props> {
  private id = 0;

  private reactReplaceString(
    input: string,
    searchValue: string | RegExp,
    replaceValue: React.ReactNode,
  ) {
    const regex =
      searchValue instanceof RegExp
        ? searchValue
        : new RegExp(searchValue, 'ig');

    let inp = input;
    let replacer = replaceValue;
    let result: RegExpExecArray | null = null;
    const output: React.ReactNode[] = [];

    while ((result = regex.exec(inp)) !== null) {
      const index = result.index;
      const match = result[0];

      output.push(inp.substring(0, index));

      if (React.isValidElement(replaceValue)) {
        // Fixes `Each child in an array or iterator should have a unique "key" prop.` error.
        replacer = React.cloneElement(replaceValue, {
          key: `L10n-${(this.id += 1)}`,
        });
      }
      output.push(replacer);

      inp = inp.substring(index + match.length, input.length + 1);
      regex.lastIndex = 0;
    }

    output.push(inp);
    return output;
  }

  private reactReplacer(input: React.ReactNode[], replacer: ReplaceParams) {
    const [searchValue, replaceValue] = replacer;
    return input.reduce<React.ReactNode[]>((result, part) => {
      if (typeof part === 'string') {
        return [
          ...result,
          ...this.reactReplaceString(part, searchValue, replaceValue),
        ];
      }
      return [...result, part];
    }, []);
  }

  render() {
    return (this.props.replaces || []).reduce<React.ReactNode[]>(
      (result, replacer) => this.reactReplacer(result, replacer),
      [this.props.text],
    );
  }
}
