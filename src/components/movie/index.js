import React,{Component} from "react";
import { Button } from 'antd-mobile';
import PropTypes from "prop-types"
import "./index.scss"

export default class Movie extends Component{
	static contextTypes = {
		history:PropTypes.object
	}

	constructor(props){
		super(props)
	}
	changeUrl = (movieId)=>{
		this.context.history.push(`/movie/${movieId}`)
	}
	render(){
		let {data} = this.props;
		return(
			<div className="movie" onClick={this.changeUrl.bind(this,data.movieId)}>
				<div className="movie-img">
					<img src={data.img} />
				</div>
				<div className="movie-info">
					<p className="movie-name">
						{data.t}
						{data.r === -1||data.r === 0?"":<span>{data.r}</span>}
					</p>
					<p className="movie-desc">
						{data.commonSpecial}
					</p>
					<p className="show-info">
						{data.versions.map((item,index)=>{
							return <span key={index}>{item.version}</span>
						})}
					</p>
					<p className="on-the-show">
						{data.NearestCinemaCount}家影院上映{data.NearestShowtimeCount}场
					</p>
					<Button  className="buying">购票</Button>
				</div>
				
			</div>
			
		)
	}
}