import React from 'react';
import gameStyle from '../../styles/gameStyle';
import Square from './Square';

import { isMod } from '../../reducers/game/utils';

const Line = ({ line }) => (
  <div style={{ display: 'flex' }}>
    {line.map(
      (square, index) =>
        square ? (
          <Square key={index} color={square} />
        ) : (
          <div
            key={index}
            style={{
              width: '4vh',
              height: '4vh'
            }}
          />
        )
    )}
  </div>
);

const Bomb = ({ tetri, position }) => (
  <div style={gameStyle.pieces.all(position)}>
    <div
      style={{
        display: 'flex',
        animation: gameStyle.animations.bomb + ' 0.2s infinite',
        animationDirection: 'alternate'
      }}
    >
      <div style={gameStyle.bomb.all} />
      <div style={gameStyle.bomb.mech} />
      <div style={gameStyle.bomb.reflect} />
      <div
        style={{
          position: 'absolute',
          transform: 'rotate(-10deg)',
          animation: gameStyle.animations.fire + ' 0.1s infinite',
          animationDirection: 'alternate'
        }}
      >
        <div style={gameStyle.bomb.fire} />
        <div style={gameStyle.bomb.fire2} />
        <div style={gameStyle.bomb.fire3} />
      </div>
    </div>
  </div>
);

const reduceColumnsEndTetri = tetri =>
  !tetri.reduce(
    (lineAccumulator, line) =>
      line.reduce(
        (blockAccumulator, block, index) =>
          index === line.length - 1 ? !!block : true
      ) || lineAccumulator,
    false
  )
    ? tetri.map(line =>
        line.filter((block, index) => index !== line.length - 1)
      )
    : tetri;

const reduceTetri = tetri => reduceColumnsEndTetri(tetri);

export const Tetri = ({ tetri, position }) => {
  if (!position) position = { x: 0, y: 0 };
  const mod = isMod({ grid: tetri, x: position.x, y: position.y });
  if (mod && mod.type === 'bomb')
    return <Bomb tetri={tetri} position={position} />;
  return (
    <div style={gameStyle.pieces.all(position)}>
      {reduceTetri(tetri).map((line, index) => (
        <Line key={index} line={line} />
      ))}
    </div>
  );
};
