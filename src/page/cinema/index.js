import React,{Component} from "react"
import "./index.scss"
import {Icon} from "antd-mobile"
import {getCinemas} from "../../ajax/api"
import LoadMore from "../../components/loadmore"

export default class Cinema extends Component{
	constructor(props){
		super(props);
		this.state={
			array:[],
			num:20
		}
	}
	getCinemaData = async ()=>{
		let data = await getCinemas();
		this.setState({
			array:data.data.data.cinemaList
		})
	}
	load = ()=>{
		this.setState({
			num:this.state.num+20
		})
	}
	componentDidMount(){
		this.getCinemaData()
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
				<LoadMore load={this.load}>
					<div>
						<ul className="cinema-list">
						{
							this.state.array.slice(0,this.state.num).map((item,index)=>{
								return(
									<li key={index}>
										<header>
											<span className="cinema-name">
												{item.cinameName}
											</span>
											<span className="cinema-price">
												<strong>{item.minPrice/100}元</strong>起
											</span>
										</header>
										<p className="cinema-location">
											{item.address}
										</p>
										<div className="cinema-tag">
											{Object.keys(item.feature).map((_item,index)=>{
												if(item.feature[_item]){
													return <span key={index}>{_item.slice(3)}</span>
												}
											})}
										</div>
										<p className="recent-movie">
											近期场次
										</p>
									</li>
								)
							})
						}
							
						</ul>
					</div>
				</LoadMore>
			</div>
		)
	}
}