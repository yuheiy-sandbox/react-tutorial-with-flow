/* @flow */
'use strict';
import React from 'react';
import {EventEmitter} from 'events';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import type {CommentType} from './CommentType';

type Props = {
  url: string
};

type State = {
  comments: Array<CommentType>
};

export default class CommentBox extends React.Component {
  props: Props;
  state: State;

  emitter: EventEmitter;
  dispatch: Function;

  constructor(props: Props) {
    super(props);

    this.emitter = new EventEmitter();
    this.emitter.on('addComment', (author: string, text: string) => {
      const newComment = {
        id: Date.now(),
        author,
        text
      };
      this.setState({comments: this.state.comments.concat(newComment)});
    });
    this.dispatch = this.emitter.emit.bind(this.emitter);

    this.state = {
      comments: []
    };
  }

  loadCommentsFromServer(): Promise {
    return fetch(this.props.url)
      .then((response) => response.json())
      .then(({comments}) => this.setState({comments}))
      .catch((ex) => console.error(ex));
  }

  componentDidMount(): void {
    this.loadCommentsFromServer();
  }

  componentWillUnMount(): void {
    this.emitter.removeAllListeners();
  }

  render(): React.Element {
    return (
      <div>
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm dispatch={this.dispatch} />
      </div>
    );
  }
}
