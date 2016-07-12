import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        {
          posts.reduce((pairs, post, index) => { // split the books into pairs
            if (index % 2 === 0) {
              pairs.push([]);
            }
            pairs[pairs.length - 1].push(post);
            return pairs;
          }, []).map((pair, index) => ( // map the pairs to row
            <PostRow key={ index } postPair={ pair } />
          ))
        }
      </div>
    );
  }
}

