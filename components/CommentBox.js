/* @flow */
'use strict';
import React from 'react';
import {EventEmitter} from 'events';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import type {CommentType} from '../Types';

export default class CommentBox extends React.Component {
  props: {
    url: string
  };

  state: {
    comments: Array<CommentType>
  };

  emitter: EventEmitter;

  constructor(props?: any) {
    super(props);
    this.state = {
      comments: []
    };

    this.emitter = new EventEmitter();
    this.emitter.on('addComment', (author: string, text: string) => {
      const newComment = {
        id: Date.now(),
        author,
        text
      };
      this.setState({comments: this.state.comments.concat(newComment)});
    });
  }

  loadCommentsFromServer(): Promise {
    return fetch(this.props.url)
      .then((response) => response.json())
      .then(({comments}) => this.setState({comments}))
      .catch((ex) => console.error(ex));
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  componentWillUnMount() {
    this.emitter.removeAllListeners();
  }

  render() {
    const dispatch = this.emitter.emit.bind(this.emitter);
    return (
      <div>
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm dispatch={dispatch} />
      </div>
    );
  }
}
