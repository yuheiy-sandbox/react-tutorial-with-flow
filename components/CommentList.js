/* @flow */
'use strict';
import React from 'react';
import Comment from './Comment';
import type {CommentType} from '../Types';

export default function CommentList({comments}: {comments: Array<CommentType>}) {
  return (
    <div>
      {comments.map(({id, author, text}) => (
        <Comment key={id} author={author}>{text}</Comment>
      ))}
    </div>
  );
}
