import React,{Component} from "react"
import "./index.scss"
import {Icon} from "antd-mobile"
import {getCinemas} from "../../ajax/api"

export default class Cinema extends Component{
	constructor(props){
		super(props)
	}
	getCinemaData = async ()=>{
		let data = await getCinemas();
		console.log(data)
	}

	componentDidMount(){
	}

	render(){
		return(
			<div className="cinema">
				<nav>
					<div className="location">
						<span>北京</span>
						<Icon type="down" />
					</div>
					<ul className="category">
						<li>
							区域
							<Icon type="down"/>
						</li>
						<li>
							综合排序
							<Icon type="down"/>
						</li>
						<li>
							特色
							<Icon type="down"/>
						</li>
					</ul>
					<div className="search-icon">
						<Icon type="search" size="xxs" />
					</div>
				</nav>
			</div>
		)
	}
}