/* ABOUT: Renders a line. It can be thick or slim, depends on the props. */

import React from 'react';

const SeparationLine = ({ internal }) => (
  <div className={ internal ? "SeparationLine-internal" : "SeparationLine" } />
);

export default SeparationLine;
