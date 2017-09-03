import React, { Component, PropTypes } from 'react';
import styles from './Dropdown.scss';
import CSSModules from 'react-css-modules';

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: ''
    };

    this.createSelectItems = this.createSelectItems.bind(this);
	}

	handleChanges( event ) {
		if ( this.props.onChange ) {
			this.props.OnChange( event );
		}
  }

  createSelectItems() {
    let items = []
    for ( var i = 0; i < this.props.options.length; i++ ) {
      items.push(<option key={i} value={this.props.options[i]['value']}>{this.props.options[i]['label']}</option>)
    }

    return items;
  }

  render(props) {

    return (
      <select className={"select-" + this.props.label} onChange={this.handleChanges} >
      <option selected disabled hidden>{this.props.placeholder}</option>
      {this.createSelectItems()}
      </select>
		);
	}
}
export default CSSModules(Dropdown, styles);
