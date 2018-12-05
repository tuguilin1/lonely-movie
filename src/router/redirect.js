import React,{Component} from "react";
import PropTypes from "prop-types"

export default class Redirect extends Component{
	static contextTypes = {
		history:PropTypes.object,
		location:PropTypes.object
	}
	constructor(props){
		super(props)
	}
	render(){
		let {origin,destination} = this.props;
		let {location:{pathname}} = this.context;
		if(origin === pathname){
			this.context.history.push(destination)
		}
		return null
	}
}