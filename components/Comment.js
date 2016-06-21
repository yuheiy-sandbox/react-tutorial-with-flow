/* @flow */
'use strict';
import React from 'react';

export default function Comment({author, children}: {author: string, children?: any}) {
  return (
    <div>
      <h2>{author}</h2>
      <p>{children}</p>
    </div>
  );
}
