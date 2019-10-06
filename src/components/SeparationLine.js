import React from 'react';

const SeparationLine = ({ internal }) => (
  <div className={ internal ? "SeparationLine-internal" : "SeparationLine" } />
);

export default SeparationLine;
