import React, { useCallback, useState } from 'react';

import BoardSize from '../../utils/board-size.js';
import calculateWinner from '../../utils/calculate-winner.js';
import Styled from './styled.js';

const {
  Board,
  History,
  Info,
  Main,
  Move,
  MoveButton,
  Reference,
  Status,
  Title,
} = Styled;

const INITIAL_STATE = {
  history: [
    {
      squares: new Array(BoardSize.getTotal()).fill(null),
    }
  ],
  isXNext: true,
  stepNumber: 0,
};

export default function Game() {
  const [state, setState] = useState(INITIAL_STATE);

  const current = state.history[state.stepNumber];
  const gameWinnerData = calculateWinner(current.squares);

  const status = gameWinnerData
    ? `Winner: ${gameWinnerData.symbol}`
    : `Next player: ${state.isXNext ? 'X' : 'O'}`;

  const handleClick = useCallback((i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const isWon = Boolean(calculateWinner(current.squares));
    if (isWon || current.squares[i]) {
      return;
    }
    const squares = [...current.squares];
    squares[i] = state.isXNext ? 'X' : 'O';
    setState((prevState) => ({
      ...prevState,
      history: history.concat({ squares }),
      isXNext: !prevState.isXNext,
      stepNumber: history.length,
    }));
  }, [state]);

  const handleJumpTo = useCallback((step) => {
    setState((prevState) => ({
      ...prevState,
      stepNumber: step,
      isXNext: step % 2 === 0,
    }));
  }, []);

  const moves = state.history.map((_item, step) => {
    const legend = (step === 0)
      ? 'Go to game start'
      : `Go to step #${step}`;
    return (
      <Move key={step}>
        <MoveButton
          isCurrent={step === state.stepNumber}
          type="button"
          onClick={() => {
            handleJumpTo(step);
          }}
        >
          {legend}
        </MoveButton>
      </Move>
    );
  });

  return (
    <Main>
      <Title>
        <Reference href="https://reactjs.org/tutorial/tutorial.html">
          React official tutorial: Tic Tac Toe
        </Reference>
      </Title>
      <Board
        squares={current.squares}
        winnerLine={gameWinnerData ? gameWinnerData.line : []}
        onClick={handleClick}
      />
      <Info>
        <Status>{status}</Status>
        <History>{moves}</History>
      </Info>
    </Main>
  );
}
