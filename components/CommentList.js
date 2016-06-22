/* @flow */
'use strict';
import React from 'react';
import Comment from './Comment';
import type {CommentType} from './CommentType';

type Props = {
  comments: Array<CommentType>
};

export default function CommentList({comments}: Props): React.Element {
  return (
    <div>
      {comments.map(({id, author, text}) => (
        <Comment key={id} author={author}>{text}</Comment>
      ))}
    </div>
  );
}
