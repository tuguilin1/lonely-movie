import React,{Component} from "react"
import "./index.scss"
import { Icon } from 'antd-mobile'
export default class Search extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<section className="search">
				<div className="location">
					北京
					<Icon type="down"/>
				</div>
				<div className="search-bar">
					影片/影院/影人，任你搜
					<Icon type="search"/>
				</div>
			</section>
		)
	}
}