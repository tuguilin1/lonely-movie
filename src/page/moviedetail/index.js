import React,{Component} from "react"

export default class Moviedetail extends Component{
	constructor(props){
		super(props)
	}
	render(){
		console.log(this.props.param)
		return <div>123</div>
	}
}