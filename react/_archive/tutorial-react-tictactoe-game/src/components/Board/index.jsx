import React from 'react';
import styled from 'styled-components';

import Square from '../Square/index.jsx';
import BoardSize from '../../utils/board-size.js';

const StyledSquare = styled(Square)`
  margin-top: -1px;
  margin-right: -1px;
`;

function Board(props) {
  const { className, squares, winnerLine, onClick } = props;
  return (
    <div className={className}>
      {new Array(BoardSize.getTotal()).fill(null).map((_it, i) => (
        <StyledSquare
          key={i}
          value={squares[i]}
          isHighlighted={winnerLine.includes(i)}
          onClick={() => {
            onClick(i);
          }}
        />
      ))}
    </div>
  );
}

const Styled = styled(Board)`
  --grid-line: repeat(3, var(--size_square));
  display: grid;
  grid-template: var(--grid-line) / var(--grid-line);
`;

export default Styled;
