import React, {Component, PropTypes} from 'react';
import Post from './Post';

export default class PostRow extends Component {
  static propTypes = {
    postPair: PropTypes.array
  };

  render() {
    const { postPair } = this.props;
    return (
      <div className="row">
        {
          postPair.map((post, index) => (
            <Post key={ index } post={ post }/>
          ))
        }
      </div>
    );
  }
}

