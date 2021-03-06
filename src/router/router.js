import React,{Component} from "react";
import PropTypes from "prop-types"

export default class Router extends Component{
	static childContextTypes = {
		location:PropTypes.object,
		history:PropTypes.object
	}
	constructor(props){
		super(props);
		this.state = {
			location:{pathname:window.location.hash.slice(1)||"/"}
		}
	}
	getChildContext(){
		return {
			location:this.state.location,
			history:{
				push:(path)=>{
					window.location.hash = path
				}
			}
		}
	}
	componentDidMount(){
		window.location.hash = window.location.hash.slice(1)||"/";
		let render = ()=>{	
			this.setState({
				location:{pathname:window.location.hash.slice(1)||"/"}
			})
		}
		window.addEventListener("hashchange",render)
	}

	render(){
		return(
			this.props.children
		)
	}
}