/* @flow */
'use strict';
import React from 'react';

export default class CommentForm extends React.Component {
  props: {
    dispatch: Function
  };

  state: {
    author: string,
    text: string
  };

  constructor(props?: any) {
    super(props);
    this.state = {
      author: '',
      text: ''
    };
  }

  // ev: Event
  onChange(inputName: string, ev: any): void {
    this.setState({[`${inputName}`]: ev.target.value});
  }

  onSubmit(ev: Event): void {
    ev.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!author || !text) {
      return;
    }
    this.props.dispatch('addComment', author, text);
    this.setState({text: ''});
  }

  render() {
    const {author, text} = this.state;
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={this.onChange.bind(this, 'author')}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={text}
          onChange={this.onChange.bind(this, 'text')}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}
