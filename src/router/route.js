import React,{Component} from "react";
import PropTypes from "prop-types"

export default class Route extends Component{
	static contextTypes = {
		location:PropTypes.object,
		push:PropTypes.object
	}
	constructor(props){
		super(props)
	}
	render(){
		let {location:{pathname}} = this.context;
		console.log(pathname)
		let {path,component:Component} = this.props;
		if(path === pathname||pathname.startsWith(path)){
			return <Component/>
		}
		return null
	}
}