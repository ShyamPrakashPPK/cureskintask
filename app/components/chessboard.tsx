'use client';
import React, { useState } from 'react';

const Chessboard: React.FC = () => {
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  const isDarkSquare = (row: number, col: number): boolean => {
    return (row + col) % 2 === 1;
  };

  const isBishopAttackSquare = (
    row: number,
    col: number,
    hoverRow: number,
    hoverCol: number
  ): boolean => {
    return (
      Math.abs(row - hoverRow) === Math.abs(col - hoverCol) &&
      (row !== hoverRow || col !== hoverCol)
    );
  };

  const handleSquareHover = (row: number, col: number) => {
    const squares: string[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isBishopAttackSquare(i, j, row, col)) {
          squares.push(`${i}-${j}`);
        }
      }
    }
    setHighlightedSquares(squares);
    setHoveredSquare(`${row}-${col}`);
  };

  const renderSquare = (row: number, col: number) => {
    const squareKey = `${row}-${col}`;
    const isHighlighted = highlightedSquares.includes(squareKey);
    const isHovered = squareKey === hoveredSquare;

    return (
      <div
        key={squareKey}
        className={`square ${isDarkSquare(row, col) ? 'dark' : 'light'} ${
          isHighlighted && 'highlight'
        } ${isHovered && 'hover'}`}
        onMouseEnter={() => handleSquareHover(row, col)}
        onMouseLeave={() => setHoveredSquare(null)}
      />
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.push(renderSquare(i, j));
      }
    }
    return board;
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default Chessboard;
