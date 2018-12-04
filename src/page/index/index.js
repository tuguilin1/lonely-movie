import React,{Component} from "react"
import Header from "../../components/header"
import Article from "../../components/article"
import Onshow from "../../components/onshow"
import { Icon } from 'antd-mobile'
import "./index.scss"

export default class Index extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<Header/>
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
				<Onshow/>
			</div>
		)
	}
}