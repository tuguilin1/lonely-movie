import React,{Component} from "react"
import "./index.scss"
let i = 0
export default class Sheet extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeNum:0
		}
	}
	shouldComponentUpdate(nextprops,nextstate){
		if(!this.props.movie){
			return true
		}
		if(nextprops.movie.movieId !== this.props.movie.movieId||nextstate.activeNum !== this.state.activeNum){
			return true
		}
		return false
	}
	render(){
		if(!this.props.movie||!this.props.list){
			return null
		}
		let {movieId,showDates} = this.props.movie;
		let {list} = this.props.list.find((item)=>{
			return item.moviekey==`${movieId}_${showDates[this.state.activeNum]}`
		})
		return (
			<div className="sheet">
				<nav>
					{showDates.map((item,index)=>{
						return <div key={index} className={this.state.activeNum === index?"active":""} onClick={()=>{this.setState({activeNum:index})}}>{item.slice(5).split("-").join("月")+"日"}</div>
					})}
				</nav>
				<ul className="play-list">
					{
						list.map((item,index)=>{
							return <li key={index}>
								<div>
									<p className="start-time">{getTime(item.showDay)}</p>
									<p className="end-time">{getTime(item.showDay+120*60)}散场</p>
								</div>
								<div>
									<p className="language">{item.language} {item.versionDesc}</p>
									<p className="position">{item.hall}</p>
								</div>
								<div className="movie-price">
									<p className="now-price">特惠{item.dsBoxPrice/100}元</p>
									<p className="pre-price">80.00元</p>
								</div>
								<div className="buy-btn">
									<p>购票</p>
								</div>
							</li>
						})
					}
					
				</ul>
			</div>
		)
	}
}

function getTime(time){
	let date = new Date(time*1000);
	let hour = date.getHours();
	hour = hour<10?hour+"0":hour;
	let minutes = date.getMinutes();
	minutes = minutes<10?minutes+"0":minutes;
	return `${hour}:${minutes}`
}