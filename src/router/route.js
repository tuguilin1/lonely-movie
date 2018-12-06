import React,{Component} from "react";
import PropTypes from "prop-types"
import pathToRegexp from "path-to-regexp"

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
		let {path,component:Component} = this.props;
		if(path.includes(":")){
			let keys = []
			let re = pathToRegexp(path,keys);
			let match = re.exec(pathname);
			if(match){
				let param = {};
				keys.forEach((item,index)=>{
					param[item.name] = match[index+1]
				})
				return <Component param={param} />
			}
		}
		if(path === pathname||pathname.startsWith(path)){
			return <Component/>
		}
		return null
	}
}