import React,{Component} from "react"
import {store} from "../../redux"
import Search from "../../components/search"
import { SegmentedControl, Icon } from 'antd-mobile'
import "./index.scss"

export default class Hotmovie extends Component{
	constructor(props){
		super(props)
	}
	render(){
		let data = store.getState();
		console.log(data)
		return(
			<div className="hot-movie">
				<header>
					<Icon size="lg" type="left"  color="white" />
					<SegmentedControl className="choice" values={['正在热映', '即将上映']} />
				</header>
				<Search />
			</div>
		)
	}
}