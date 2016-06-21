/* @flow */
'use strict';
import React from 'react';
import {render} from 'react-dom';
import CommentBox from './components/CommentBox';

render(<CommentBox url="./comments.json" />, document.getElementById('app'));
