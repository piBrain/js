import React, { Component, PropTypes } from 'react';
import './InputField.css';

export default class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEmpty: true,
		 	value: null,
			valid: false,
			errorMessag: "This text is invalid",
			errorVisible: false
		};
    this.handleChanges = this.handleChanges.bind(this)
	}

	handleChanges( event ) {
		this.validate( event.target.value );

		if ( this.props.onChange ) {
			this.props.onChange( event );
		}

	}

	validate( value, valid ) { //valid is an optional variable that defaults to true when no value is given
		if ( typeof valid === 'undefined') {
			valid = true;
		}

		var errorMessage = '';
		var errorVisible = false;

		if ( !valid ) {
			errorMessage = this.props.emptyMessage;
			valid = false;
			errorVisible = true;
		}

		else if (this.props.required && Object.keys(value).length === 0){
			errorMessage = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		}

		else if ( value.length < this.props.minCharacters ) {
			errorMessage = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		}

		this.setState({
			value: value,
			isEmpty: Object.keys(value).length === 0,
			valid: valid,
			errorMessage: errorMessage,
			errorVisible: errorVisible
		});

	}

	handleBlur ( event ) {
		var valid = this.props.validate(event.target.value);

		this.validate( event.target.value, valid );
	}

	render(props) {
		let field = null;

		if (this.props.textArea) {
			field = <div className={this.props.className} >
				<textarea id="input-field"
					type={this.props.type}
					className={"input input-" + this.props.className}
					placeholder={this.props.text}
					value={this.props.value}
					onChange={this.handleChanges}
					onBlur={this.handleBlur} />
			</div>
		}
		else {
			field = <div className={this.props.className} >
				<input id="input-field"
					type={this.props.type}
					className={"input input-" + this.props.className}
					placeholder={this.props.text}
					value={this.props.value}
					onChange={this.handleChanges}
					onBlur={this.handleBlur} />
			</div>
		}
		return (
			<div>
				{field}
			</div>
		);
	}
}

