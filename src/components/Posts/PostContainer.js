import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const styles = require('./Post.scss');

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

export default class PostContainer extends Component {
  static propTypes = {
    posts: PropTypes.object
  };

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

