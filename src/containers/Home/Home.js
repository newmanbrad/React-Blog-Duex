import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PostContainer } from 'components';
import { isLoaded as postsLoaded, load as loadPosts } from 'redux/modules/postList';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!postsLoaded(getState())) {
      promises.push(dispatch(loadPosts()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    postList: state.postList.data
  }))

export default class Home extends Component {
  static propTypes = {
    postList: PropTypes.object
  };

  render() {
    const { postList } = this.props;
    const { posts } = postList.data;

    return (
      <div>
        <Helmet title="Posts" />

        <PostContainer posts={posts}/>

      </div>
    );
  }
}
