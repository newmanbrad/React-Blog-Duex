import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { AsideWidget } from 'components';
import { isLoaded as isLayoutLoaded, load as loadLayout } from 'redux/modules/layout';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isLayoutLoaded(getState())) {
      promises.push(dispatch(loadLayout()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    layout: state.layout.data
  }),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    layout: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    // const styles = './App.scss';
    const { layout } = this.props;
    const { blogInfo, articleTags, links } = layout.data;
    return (
      <div>
        <Helmet {...config.app.head}/>

        <header>
          <div className="widewrapper masthead">
            <div className="container">

              <Link to="/" itemID="logo">
                { blogInfo.title }
              </Link>

              <div id="mobile-nav-toggle" className="pull-right">
                <a href="#" data-toggle="collapse" data-target=".navbar-collapse">
                  <i className="fa fa-bars"/>
                </a>
              </div>

              <div className="pull-right tales-nav">

                <div className="collapse navbar-collapse">
                  <ul className="nav nav-pills navbar-nav">

                    <li className="dropdown active">
                      <Link to="/" className="dropdown-toggle" data-toggle="dropdown">
                        {blogInfo.title}
                        <b className="caret"/>
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to="/">{blogInfo.title}</Link></li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <div className="widewrapper subheader">
            <div className="container">
              <div className="tales-breadcrumb">
                <Link to="/">{blogInfo.title}</Link>
              </div>

              <div className="tales-searchbox">
                <form action="#" method="get" acceptCharset="utf-8">
                  <button className="searchbutton" type="submit">
                    <i className="fa fa-search"/>
                  </button>
                  <input className="searchfield" id="searchbox" type="text" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
        </header>

        <div className="widewrapper main">
          <div className="container">
            <div className="row">
              <div className="col-md-8 blog-main">
                { this.props.children }
              </div>
              <div className="col-md-4 blog-aside">

                <AsideWidget data={links} listClass="tales-list" widgetType="Links" />

                <AsideWidget data={articleTags} listClass="tags" widgetType="Tags" />

              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="widewrapper footer">
            <div className="container">
              <div className="row">
                <div className="col-md-4 footer-widget">
                  <h3> <i className="fa fa-wpforms"/>Statistics</h3>

                  <span>Even we sometimes loose track of how many articles we actually have here.  This one helps:</span>

                  <div className="stats">
                    <div className="line">
                      <span className="counter">27</span>
                      <span className="caption">Articles</span>
                    </div>
                    <div className="line">
                      <span className="counter">208</span>
                      <span className="caption">Comments</span>
                    </div>
                    <div className="line">
                      <span className="counter">2</span>
                      <span className="caption">Authors</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 footer-widget">
                  <h3> <i className="fa fa-star"/> Hall of Fame</h3>
                  <ul className="tales-list">
                    <li><a href="index.html">Why we Need to Encrypt All Communication</a></li>
                    <li><a href="#">Selling is a Function of Design. Not Vice-Versa.</a></li>
                    <li><a href="#">It’s Hard To Come Up With Dummy Titles</a></li>
                    <li><a href="#">Why the Internet is Full of Cats</a></li>
                    <li><a href="#">Last Made-Up Headline, I Swear!</a></li>
                  </ul>
                </div>

                <div className="col-md-4 footer-widget">
                  <h3> <i className="fa fa-envelope"/>Contact Me</h3>

                  <span>I'm happy to hear from my readers. Thoughts, feedback, critique - all welcome! Drop me a line:</span>

                  <span className="email">
                      <a href="#">jimmy@notanactualemail.com</a>, PGP key 0x5AK0BEA1
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="widewrapper copyright">
            <div className="container">

              By <a href="" rel="nofollow">Brad Newman</a>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}
