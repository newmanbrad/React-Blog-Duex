import React, { Component } from 'react';
import Post from './Post';

export default class PostRow extends Component {
  render() {
    const { post } = this.props;
    const styles = require('./Post.scss');
    return (
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
  }
}

