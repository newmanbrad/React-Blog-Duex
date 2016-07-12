import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { CounterButton, GithubButton } from 'components';
import { isLoaded as postsLoaded, load as loadPosts } from 'redux/modules/postList';
// import config from '../../config';
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
    const styles = require('./Home.scss');
    const { postList } = this.props;

    const Post = ({ post }) => (
      <div className="col-md-6 col-sm-6">
        <article className={styles.blogTeaser}>
          <header>
            <img src={post.image} alt="A Cat"/>
            <h3><Link to="/article" query={{id: post._id}} title={post.title}>{post.title}</Link></h3>
            <span className="meta">{post.createTime.slice(0, 10)}, {post.author}</span>
            <hr/>
          </header>
          <div className="body" dangerouslySetInnerHTML={{__html: post.introduction}}>
          </div>
          <div className="clearfix">
            <Link to="/article" query={{id: post._id}} title={post.title} className="btn btn-tales-one"><i className="icon-forward"></i> Read More</Link>
          </div>
        </article>
      </div>
    );

    const PostRow = ({ postPair }) => (
      <div className="row">
        {
          postPair.map((post, index) => (
            <Post key={ index } post={ post }/>
          ))
        }
      </div>
    );

    const PostContainer = ({ posts }) => (
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

    const { posts } = postList.data;

    return (
      <div>
        <Helmet title="Posts" />

        <PostContainer posts={posts}/>

      </div>
    );
  }
}
