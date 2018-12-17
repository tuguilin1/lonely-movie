import React,{Component} from "react"
import Header from "../../components/header"
import Article from "../../components/article"
import IndexPage from "../../components/indexpage"
import Cinema from "../cinema"
import {Route,Redirect} from "../../router"

export default class Index extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<Header push={this.props.push}/>

				<Route path="/index/movie" component={IndexPage} />
				<Route path="/index/cinema" component={Cinema} />
				<Redirect origin="/index" destination="/index/movie" />
			</div>
		)
	}
}