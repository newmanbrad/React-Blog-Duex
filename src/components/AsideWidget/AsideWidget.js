import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class AsideWidget extends Component {
  static propTypes = {
    data: PropTypes.array,
    listClass: PropTypes.string,
    widgetType: PropTypes.string
  };

  createToString(item, widgetType) {
    if (widgetType === 'Tags') {
      return '/?tagPath=' + item.path;
    }
    return item.url;
  }

  render() {
    const { data, listClass, widgetType } = this.props;

    return (
      <div className="aside-widget">
        <header>
          <h3>{widgetType}</h3>
        </header>
        <div className="body clearfix">
          <ul className={listClass}>
            {data.map((item, index) => {
              return <li><Link key={index} to={ this.createToString(item, widgetType) } className="label">{item.name}</Link></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

