/* @flow */
'use strict';
import React from 'react';

type Props = {
  author: string,
  children?: any
};

export default function Comment({author, children}: Props): React.Element {
  return (
    <div>
      <h2>{author}</h2>
      <p>{children}</p>
    </div>
  );
}
