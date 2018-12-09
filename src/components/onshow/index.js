import React,{Component} from "react"
import {Icon,Badge} from "antd-mobile"
import {getNowMovie} from "../../ajax/api"
import "./index.scss"
import {store} from "../../redux"
import PropTypes from "prop-types"
import {Link} from "../../router"

export default class Onshow extends Component{
	static contextTypes = {
		history:PropTypes.object
	}
	constructor(props){
		super(props)
		this.state={
			movieList:[],
			futureNumber:0,
			nowNumber:0
		}
	}
	changeUrl = (movieId)=>{
		this.context.history.push(`/movie/${movieId}`)
	}
	getMovies = async ()=>{
		let data = await getNowMovie();
		let action = {
			type:"CHANGEMOVIES",
			payload:data.data.ms
		}
		store.dispatch(action)
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
				<Link to="/hotmovie">
					<header>
						正在热映({this.state.nowNumber})
						<Icon type="right" />
					</header>
				</Link>
				<ul className="movie-list">
					{this.state.movieList.map((item,index)=>{
						return (
							<li key={index} onClick={this.changeUrl.bind(this,item.movieId)}>
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
				<Link to="/hotmovie">
					<header>
						即将上映({this.state.futureNumber})
						<Icon type="right"/>
					</header>
				</Link>
			</section>
		)
	}
}