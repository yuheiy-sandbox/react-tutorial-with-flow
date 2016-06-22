/* @flow */
'use strict';
import React from 'react';

type Props = {
  dispatch: Function
};

type State = {
  author: string,
  text: string
};

export default class CommentForm extends React.Component {
  props: Props;
  state: State;

  onSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: '',
      text: ''
    };
  }

  // evt: SyntheticFormEvent
  onChange(inputName: string, evt: any): void {
    this.setState({[`${inputName}`]: evt.target.value});
  }

  // evt: SyntheticFormEvent
  onSubmit(evt: SyntheticEvent): void {
    evt.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!author || !text) {
      return;
    }
    this.props.dispatch('addComment', author, text);
    this.setState({text: ''});
  }

  render(): React.Element {
    const {author, text} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(evt) => this.onChange('author', evt)}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={text}
          onChange={(evt) => this.onChange('text', evt)}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}
