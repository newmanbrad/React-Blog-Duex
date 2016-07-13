import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object
  };

  render() {
    const { post } = this.props;
    return (
      <div className="col-md-6 col-sm-6">
        <article className="blogTeaser">
          <header>
            <img src={post.image}/>
            <h3><Link to={`/article?id=${post._id}`} title={post.title}>{post.title}</Link></h3>
            <span className="meta">{post.createTime.slice(0, 10)}, {post.author}</span>
            <hr/>
          </header>
          <div className="body" dangerouslySetInnerHTML={{__html: post.introduction}}>
          </div>
          <div className="clearfix">
            <Link to={`/article?id=${post._id}`} title={post.title} className="btn btn-tales-one"><i className="icon-forward"></i> Read More</Link>
          </div>
        </article>
      </div>
    );
  }
}

