import React from 'react';
import styled from 'styled-components';

function Square(props) {
  const { className, value, onClick } = props;
  const hasValue = Boolean(value);
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={hasValue ? null : 'Square is empty'}
    >
      {hasValue && value}
    </button>
  );
}

const Styled = styled(Square).attrs((props) => ({
  color: props.isHighlighted ? 'red' : null,
}))`
  border: var(--border);
  padding: 0;
  font-weight: 700;
  font-size: calc(var(--size_square) * 2 / 3);
  line-height: var(--size_square);
  text-align: center;
  color: ${(props) => props.color};
  background-color: white;
`;

export default Styled;
