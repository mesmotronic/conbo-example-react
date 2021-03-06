import React, { Component } from 'react';
import { bindAll } from 'conbo';
import { AppContext } from '../context';
import NameEvent from '../events/NameEvent';

/**
 * Input view
 * @author	Neil Rackett
 */
export default class InputView extends Component
{
	static contextType = AppContext;

	transientName;

	constructor(props, context)
	{
		super(props);

		this.state = {};

		// Ensures all of this classes methods run in the correct scope
		bindAll(this);

		context.addEventListener(NameEvent.NAME_LOADED, this.nameLoadedHandler);
	}

	nameLoadedHandler(event)
	{
		this.setState({name: event.data.name});
	}

	inputHandler(event)
	{
		let name = event.target.value;
		this.transientName = name;
		this.context.dispatchEvent(new NameEvent(NameEvent.NAME_CHANGE, {name}));
	}

	resetHandler(event)
	{
		let { name } = this.state;
		this.transientName = name;
		this.context.dispatchEvent(new NameEvent(NameEvent.NAME_CHANGE, {name}));
	}

	save(event)
	{
		let name = this.transientName;
		this.setState({name});
		this.context.dispatchEvent(new NameEvent(NameEvent.NAME_SAVE, {name}));
		event.preventDefault();
		return false;
	}

	render()
	{
		return (
			<form className="App-intro">
				My name is
				&nbsp;<input type="text" defaultValue={this.state.name} onInput={this.inputHandler} />
				&nbsp;<button type="submit" onClick={this.save}>Save</button>
				&nbsp;<button type="reset" onClick={this.resetHandler}>Reset</button>
			</form>
		);
	}
}
