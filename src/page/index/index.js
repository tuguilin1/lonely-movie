import React,{Component} from "react"
import Header from "../../components/header"
import Article from "../../components/article"
import IndexPage from "../../components/indexpage"
import {Route,Redirect} from "../../router"

export default class Index extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<Header/>

				<Route path="/index/movie" component={IndexPage} />
				<Redirect origin="/index" destination="/index/movie" />
			</div>
		)
	}
}