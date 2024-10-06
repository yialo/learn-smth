import styled from 'styled-components';

import RawBoard from '../Board/index.jsx';

export default {
  Board: styled(RawBoard)`
    grid-area: 2 / 1 / 3 / 2;
  `,

  History: styled.ol`
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style-type: none;
    counter-reset: history-item;
  `,

  Info: styled.div`
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-left: 32px;
  `,

  Main: styled.main`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;
    padding: 20px;
  `,

  Move: styled.li`
    display: flex;

    &::before {
      content: counter(history-item);
      counter-increment: history-item;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 2px;
      width: 14px;
      font-size: 16px;
    }

    &:not(:last-child) {
      margin-bottom: 2px;
    }
  `,

  MoveButton: styled.button.attrs((props) => ({
    fontWeight: props.isCurrent ? '700' : null,
  }))`
    min-width: 140px;
    border: var(--border);
    padding: 4px;
    font-weight: ${(props) => props.fontWeight};
    font-size: 14px;
    text-align: left;
    background-color: white;
  `,

  Reference: styled.a`
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: underline;
    }
  `,

  Status: styled.p`
    margin-top: 0;
    margin-bottom: 20px;
    width: 100%;
  `,

  Title: styled.h1`
    grid-area: 1 / 1 / 2 / 3;
    margin-top: 0;
    margin-bottom: 32px;
    border-bottom: var(--border);
    padding-bottom: 24px;
    font-weight: 400;
    font-size: 20px;
  `,
};

