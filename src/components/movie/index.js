import React,{Component} from "react";
import { Button } from 'antd-mobile';
import "./index.scss"

export default class Movie extends Component{
	constructor(props){
		super(props)
	}

	render(){
		let {data} = this.props;
		return(
			<div className="movie">
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