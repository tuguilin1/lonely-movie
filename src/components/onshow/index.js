import React,{Component} from "react"
import {Icon,Badge} from "antd-mobile"
import {getNowMovie} from "../../ajax/api"
import "./index.scss"

export default class Onshow extends Component{
	constructor(props){
		super(props)
		this.state={
			movieList:[],
			futureNumber:0,
			nowNumber:0
		}
	}
	getMovies = async ()=>{
		let data = await getNowMovie();
		this.setState({
			movieList:data.data.ms.slice(0,8),
			futureNumber:data.data.totalComingMovie,
			nowNumber:data.data.ms.length
		})
	}
	componentDidMount(){
		this.getMovies()
	}
	render(){
		return(
			<section className="onshow">
				<header>
					正在热映({this.state.nowNumber})
					<Icon type="right" />
				</header>
				<ul className="movie-list">
					{this.state.movieList.map((item,index)=>{
						return (
							<li key={index}>
								<Badge text={item.r === -1?"":item.r} corner>
									<div className="movie-img">
										<img src={item.img}/>
									</div>
								</Badge>
								<p className="movie-name">{item.t}</p>
							</li>
						)
					})}

				</ul>
				<header>
					即将上映({this.state.futureNumber})
					<Icon type="right"/>
				</header>
			</section>
		)
	}
}